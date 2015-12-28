// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
(function() {
    try {
        if (window.location.pathname.search(/grade\/report\/grader\/index[.]php$/) == -1 &&
            window.location.search.match(/[?&]edit=1/) == -1) {
            return;
        }
        var matches = window.location.search.match(/[?&]id=(\d+)/);
        if (!matches) {
            return;
        }
        var courseid = matches[1];
        var req = new XMLHttpRequest();
        req.open('GET', '/moodle/local/attendancefilter/ajax.php?mode=list&course=' + courseid, true);
        req.onreadystatechange = function(aEvt) {
            try {
                if (req.readyState == 4 && req.status == 200) {
                    var sessions = JSON.parse(req.responseText);
                    var ids = Object.keys(sessions);
                    if (ids.length == 0) {
                        return;
                    }
                    var ret = '<option value="">All</option>';
                    for (var i = 0; i < ids.length; i++) {
                        ret += '<option value="' + ids[i] + '">' + sessions[ids[i]].description + '</option>';
                    }
                    var select = document.createElement("select");
                    select.id = "attendancefilter";
                    select.innerHTML = ret;
                    select.addEventListener("change", function(ev) {
                        try {
                            var d = document.querySelectorAll('#user-grades tr[data-uid]');
                            for (var i = 0; i < d.length; i++) {
                                d[i].style.visibility = 'inherit';
                            }
                            d = document.querySelectorAll('div.floater.sideonly div.user[data-uid]');
                            for (i = 0; i < d.length; i++) {
                                d[i].style.visibility = 'inherit';
                            }
                            if (ev.target.value == "") {
                                return;
                            }
                            var req2 = new XMLHttpRequest();
                            req2.open('GET', '/moodle/local/attendancefilter/ajax.php?mode=filter&course=' + courseid + '&session=' + ev.target.value, true);
                            req2.onreadystatechange = function(aEvt) {
                                if (req2.readyState == 4 && req2.status == 200) {
                                    var r = JSON.parse(req2.responseText);
                                    var d = document.querySelectorAll('#user-grades tr[data-uid]');
                                    for (var i = 0; i < d.length; i++) {
                                        if (!r[d[i].dataset.uid]){
                                            d[i].style.visibility = 'hidden';
                                        }
                                    }
                                    d = document.querySelectorAll('div.floater.sideonly div.user[data-uid]');
                                    for (i = 0; i < d.length; i++) {
                                        if (!r[d[i].dataset.uid]){
                                            d[i].style.visibility = 'hidden';
                                    }
                                }
                            };
                            req2.send(null);
                        } catch (e) {
                            console.error(e)
                        }
                    });
                    var target = document.getElementsByClassName('firstinitial')[0];
                    target.parentNode.insertBefore(select, target);
                }
            } catch (e) {
                console.error(e)
            }
        };
        req.send(null);
    } catch (e) {
        console.error(e);
    }
})();