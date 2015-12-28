Ensure `Site administration > Development > Debugging > Debug messages` is set to DEVELOPER
1. Install `mod_attendence`, `local_attendencefilter` (follow the script inclusion instructions).
2. Under `Site administration > Development >  Make test course`, make a small test course.
3. Add the attendence activity to the course.
3. Go to Grader Report and verify no select box appears
4. Turn on editing and verify no select box appears because there is no attendence sessions.
5. Go to attendence and add a session (ensure in future and 1 hour duration).
6. Go to Grader Report and verify the filter select box appears with new session.
7. Go to Grader Report and select new session and verify all students have been filtered for not being present.
8. Go to attendence, go to session and mark 3 students present.
9. Go to Grader Report and select new session and verify the 3 students are not filtered for being present.
10. Scroll right and verify the names follow
11. Go to attendence, go to session and mark 2 students late.
12. Go to Grader Report and select new session and verify the 5 students are not filtered for being present or late.
13. Go to attendence, go to session and change the 2 late students to present.
14. Go to Grader Report and select new session and verify the 5 students are not filtered for being present or late.