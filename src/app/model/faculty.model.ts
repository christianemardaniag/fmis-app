import { CivilService } from "./_civilService";
import { Education } from "./_education";
import { Seminar } from "./_seminar";
import { Work } from "./_work";

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
    elementary: Education = {
        school: '',
        basicEducation: '',
        startDate: new Date,
        endDate: new Date,
        level: '',
        yearGraduated: '',
        scholarship: ''
    }
    secondary: Education = {
        school: '',
        basicEducation: '',
        startDate: new Date,
        endDate: new Date,
        level: '',
        yearGraduated: '',
        scholarship: ''
    };
    vocational?: Education[] = [];
    college?: Education[] = [];
    graduateStudies?: Education[] = [];
    civilService?: CivilService[] = [];
    workExperience?: Work[] = [];
    seminars?: Seminar[] = [];
    password: string = '';
    status: string = '';   
    
}
