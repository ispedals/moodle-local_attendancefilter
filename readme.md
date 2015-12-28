#local_attendancefilter
Allows filtering the Grader Report by people who were marked present or late in an attendance session. Note the rows are only
hidden, not removed from the Grader Report, so one has to scroll to see the filtered students.

This has only been tested on Moodle 2.8 with [Attendance module](https://github.com/danmarsden/moodle-mod_attendance)
release 2.9.1.1. This plugin will likely not work for either newer versions of Moodle or the Attendance module.

[Download here](https://github.com/ispedals/moodle-local_attendancefilter/releases/latest).

##Installation
Once installed, go to `Site administration > Appearance > Additional HTML` and under `Before BODY is closed`
paste the text in `client.min.js` into it.

##Screenshots
![Screenshot of unfiltered Grader Report](/screenshot1.png?raw=true "Screenshot1")
![Screenshot of filtered Grader Report](/screenshot2.png?raw=true "Screenshot2")

##Notes	
Ideally, the plugin would only inject the Javascript when the Grader Report is being rendered, instead of having
it be present on all pages. Also, the API to retrieve attendence information should be exposed by `mod_attendence`, possibly
as a [web service](https://docs.moodle.org/dev/Web_services). This plugin would then just be a script which can use
the new [AJAX](https://docs.moodle.org/dev/AJAX) functionality introduced in Moodle 2.9.