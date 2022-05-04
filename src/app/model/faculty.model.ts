export class Faculty {
    firstName: string = '';
    middleName?: string = '';
    lastName: string = '';
    nameExtension?: string = '';
    birthDate: string = '';
    civilStatus: string = '';
    gender: string = '';
    height?: string = '';
    weight?: number = 0;
    bloodType?: string = '';
    citizenship: string = '';
    email: string = '';
    alternativeEmail?: string = '';
    mobileNumber: string = '';
    telephoneNumber?: string = '';
    residentAddress = {
        houseNo: '',
        street: '',
        subdivision: '',
        cityProvince: '',
        municipality: '',
        zipCode: ''
    };
    permanentAddress = {
        houseNo: '',
        street: '',
        subdivision: '',
        cityProvince: '',
        municipality: '',
        zipCode: ''
    };
    gsis?: string = '';
    pagibig?: string = '';
    philhealth?: string = '';
    sss?: string = '';
    tin?: string = '';
    employeeNo?: string = '';
    elementary = {
        school: '',
        basicEducation: '',
        attandance: {start: 0, end: 0},
        level: '',
        yearGraduated: '',
        scholarship: ''
    }
    secondary = {
        school: '',
        basicEducation: '',
        attandance: {start: 0, end: 0},
        level: '',
        yearGraduated: '',
        scholarship: ''
    };
    vocational = [{
        school: '',
        basicEducation: '',
        attandance: {start: 0, end: 0},
        level: '',
        yearGraduated: '',
        scholarship: ''
    }];
    college = [{
        school: '',
        basicEducation: '',
        attandance: {start: 0, end: 0},
        level: '',
        yearGraduated: '',
        scholarship: ''
    }];
    graduateStudies = [{
        school: '',
        basicEducation: '',
        attandance: {start: 0, end: 0},
        level: '',
        yearGraduated: '',
        scholarship: ''
    }];

    password: string = '';

}
