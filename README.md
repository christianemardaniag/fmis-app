# Web-Based Faculty Management Information System
Faculty: http://fmis-app.web.app/
Admin: http://fmis-app.web.app/fmis
Database: https://fmis-app-default-rtdb.firebaseio.com/

Create a system that will allow faculty to register and create their profile (Consent promt needed). Faculty can add necessary information within the system. Faculty can also upload certificates of training, seminars, certification, etc. within the system. Faculty can print their information. Faculty can view a summary of his/her training, seminars, certifications, etc. Summary can be filtered or searched. Faculty can update his/her information.

The admin can accept faculty registration. Admin can print faculty member/s information. Admin can view a summary of faculty member/s training, seminars, certifications, etc. A summary can be filtered or searched.

[Personal Data Sheet Guidelines]{https://www.coa.gov.ph/phocadownload/userupload/HR/doc-req-for-recruitment/Guide_to_Filling_Up_the_PDS.pdf}

**FACULTY PROFILE PERSONAL INFORMATION: (Please refer to PDS)**
- First Name
- Last Name
- Middle Name (not required)
- Name Extension (not required)
- Date of Birth
- Place of Birth
- Age (Auto compute)
- Sex (Gender)
- Civil Status
- Height
- Weight
- Blood Type
- GSIS ID No. (not required)
- PAG-IBIG ID No. (not required)
- PHILHEALTH No. (not required)
- SSS No. (not required)
- TIN No. (not required)
- Employee Number
- Citizenship
- Resident Address (some fields are required)
    - House/Block/Lot No.
    - Street
    - Subdivision/Village
    - Barangay
    - City/Municipality
    - Province
    - Zip Code
- Permanent Address (some fields are required)
    - House/Block/Lot No.
    - Street
    - Subdivision/Village
    - Barangay
    - City/Municipality
    - Province
    - Zip Code
- Email address (used as username)
- Alternate Email address. (not required)
- Mobile No.
- Telephone No. (not required)
- Profile Picture (Should be follow civil service rules)
- Password


**EDUCATIONAL BACKGROUND:**
- Elementary
    - Name of School (write in full)
    - Basic Education/Degree/Course (write in full)
    - Period of attendance
        - From
        - To
    - Highest Level/Units Earned (if not graduated)
    - Year Graduate
    - Scholarship/Academic Honors Received
- Secondary
    - Name of School (write in full)
    - Basic Education/Degree/Course (write in full)
    - Period of attendance
        - From
        - To
    - Highest Level/Units Earned (if not graduated)
    - Year Graduate
    - Scholarship/Academic Honors Received
- Vocational/Trade Course (Can be multiple Entry)
    - Name of School (write in full)
    - Basic Education/Degree/Course (write in full)
    - Period of attendance (e.g. 1992-1996)
        - From
        - To
    - Highest Level/Units Earned (if not graduated)
    - Year Graduate
    - Scholarship/Academic Honors Received
- College (Can be multiple Entry)
    - Name of School (write in full)
    - Basic Education/Degree/Course (write in full)
    - Period of attendance
        - From
        - To
    - Highest Level/Units Earned (if not graduated)
    - Year Graduate
    - Scholarship/Academic Honors Received
- Graduate Studies (Can be multiple Entry)
    - Name of School (write in full)
    - Basic Education/Degree/Course (write in full)
    - Period of attendance
        - From
        - To
    - Highest Level/Units Earned (if not graduated)
    - Year Graduate
    - Scholarship/Academic Honors Received

**CIVIL SERVICE ELIGIBILITY: (Can be multiple Entry)**
- Career service/ ra 1080 (board/ bar) under special laws/ ces/ csee barangay eligibility / driver's license
- Rating (if applicable)
- Date of examination / conferment
- Place of examination / conferment
- License (if applicable)
    - Number
    - Date of validity

**WORK EXPERIENCE (Can be multiple Entry)**
- Inclusive DATES (mm/dd/yyyy)
    - From
    - To
- Position TITLE (write in full/do not abbreviate)
- Department / Agency / office / company (write in full/do not abbreviate)
- Monthly salary (e.g. P21,877).
- Salary/ job/ pay grade (if applicable) & STEP (format "00-0")/ INCREMENT (e.g. 24-2, 24 for salary grade, 2 for salary step)
- Status of appointment (permanent, temporary, casual,
contractual)
- Gov't service (y/ n)

**LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED** 
**Note.**
- Multiple Entry
- This is where training, seminars, certification will be uploaded
- Default visible L&D is for the last 5 years

- Title of learning and development interventions/training programs (write in full)
- Inclusive dates of attendance (mm/dd/yyyy)
    - From
    - To
- Number of hours
- Type of LD (Managerial/ Supervisory/ Technical/etc)
- Conducted/ sponsored by (Write in full)
- Coverage (International/(National/Regional/Local))
- Certificate (Upload image Certificate)

User Levels:
- Admin
    - Accept registration of a faculty member
    - View/Download information
    - Generate Report of a faculty member/s information
- Faculty
    - Register an account
    - Add/Update Profile
    - View/Download information
    - Generate Report of his/her information

Report Needed:
- Faculty Information Report (per category of information or all the information)
- (Admin) Faculty member/s Information Report (per category of information or all the information) (Should have filter)
- Quarterly Training/Seminars/Workshops Report

Uploads:
- Image Upload (profile)
- Certificates Image

Registration:
- Faculty should register on the Page.

**Layout.** Layout must be consistent throughout the whole program/system, easy to navigate, with proper alert and prompt messages.

**Account Registration.** Users shall register accounts before using the program/system. Allow the user to provide both username and email address (both shall be validated for duplication of entry). Different system access of user levels must be properly differentiated to one another.

**Log In and Log Out.** Allow the user to choose from username or email when logging in. Provide a confirmation before logging out. Provide security features for the login interface (ex. 3 times login attempt). Admin login must be separated to user login.

**User Profile.** Users must be able to edit or delete their account. Users must be able to upload a profile picture. Change password shall ask for the old password, new password, and confirm new password.

**Administrator.** Admin must be able to manage (CRUD) the content of the program/system. Please consider the purpose of the program on what exactly needed to be managed.
(ex. If the system is a Management Information System for a clinic… The system must be able to manage records of the patients, doctors, nurses, staffs, medicine, medical records, medical transactions, accounts, etc.)

**Content Management.** Admin must be able to (CRUD) manage the content of the system/program like logo, moto, VMGO, announcements, or anything applicable.

**Report Generation.** Admin must be able to generate reports. Please consider the data/information of the accounts to be reported.
(ex. If the system is a Management Information System for a clinic… The system must be able to provide comprehensive reports of patients, users, medicine, medical records, medical transactions, etc.)
The admin must be able to filter the reports with the specific details such as date, name, categories, and anything applicable.
The report must be printable or downloadable with proper heading, footer, logo, date and time, and the user who generated the report.