<?php
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

/**
 * Acts as API to get attendence information from database.
 *
 * The API can be queried from /moodle/local/attendancefilter/ajax.php
 * and has two mandatory parameters: mode and course. `course` is the course id
 * and mode is either `list`, to receive a JSON object of the form
 * {'session_id':{'description':'Y/M/D of the session with session description'},
 * or `filter`, which requires the parameter session to also be set to the desired
 * attendence session id. `filter` returns a JSON object of the form {'studentid':'id'}
 * for all students who have been either marked as being present or late for the session.
 *
 * @package    local_attendancefilter
 * @copyright  2015 Abir Viqar
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('AJAX_SCRIPT', true);
define('NO_OUTPUT_BUFFERING', true);
define('NO_MOODLE_COOKIES', true);
require_once('../../config.php');

global $DB, $OUTPUT;

$mode = required_param('mode', PARAM_ALPHANUM);
$courseid = required_param('course', PARAM_INT);

echo $OUTPUT->header();

if($mode == 'list'){
    $sql = "SELECT atts.id, CONCAT(DATE_FORMAT(FROM_UNIXTIME(atts.sessdate),'%Y-%m-%d'),' - ', atts.description) AS description
            FROM {attendance_sessions} AS atts
            JOIN {attendance} AS att ON att.id =  atts.attendanceid
            WHERE att.course = ?";
    $results = $DB->get_records_sql($sql, array($courseid));
    echo json_encode($results);
    die;
}

if($mode == 'filter'){
    $sessionid = required_param('session', PARAM_INT);
    $sql = "SELECT log.studentid
            FROM {attendance_log} AS log
            JOIN {attendance_sessions} AS atts ON atts.id = log.sessionid
            JOIN {attendance} AS att ON att.id = atts.attendanceid
            WHERE log.sessionid = ? AND log.statusid IN (
                SELECT attst.id FROM {attendance_statuses} AS attst
                WHERE attst.attendanceid = att.id AND (attst.acronym = 'P' OR attst.acronym = 'L')
            )";
    $results = $DB->get_records_sql($sql, array($sessionid));
    echo json_encode($results);
    die;
}