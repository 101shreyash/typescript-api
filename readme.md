
A restful backend built to practice and implement TypeScript, PostgreSQL, and Authorization for a role based note sharing platform , Users can create private notes and can browse others notes as well but what they're allowed to see depends on their role.


| Viewer (role) | Can view notes from | Cannot view notes from |
|---|---|---|
| **Student** | Other students | Teachers, guests |
| **Teacher** | Students | Other teachers, guests |
| **Guest** | Other guests | Students, teachers |
