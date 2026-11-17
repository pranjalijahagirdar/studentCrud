import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Istd } from "../model/student.model";
import { studentsArr } from "../const/student.data";
import { UuidService } from "../service/uuid.service";
import { SnackBarService } from "../service/snackbar.service";

@Component({
    selector:'app-student',
    templateUrl : './student.component.html',
    styleUrls : ['./student.component.scss']
})

export class StdComponent implements OnInit{
    @ViewChild('fnameRef')fnameRef!:ElementRef;
    @ViewChild('lnameRef')lnameRef!:ElementRef;
    @ViewChild('emailRef')emailRef!:ElementRef;
    @ViewChild('contactRef')contactRef!:ElementRef;
    @ViewChild('isActiveRef')isActiveRef!:ElementRef;
    studentsArr : Array<Istd> = studentsArr;
    isInEditMode : boolean = false
    editStdId!:string;
    constructor(
        private _uuidService:UuidService,
        private _snackBarService:SnackBarService
    ){}

    ngOnInit(): void {
        
    }

    trackByStdId(index: number, std:Istd){
        return std.stdId;
    }

    onStdAdd(){
        let newStd : Istd={
            fname:this.fnameRef.nativeElement.value,
            lname:this.lnameRef.nativeElement.value,
            email:this.emailRef.nativeElement.value,
            contact:this.contactRef.nativeElement.value,
            isActive:this.isActiveRef.nativeElement.value === 'true',
            stdId:this._uuidService.getUuid()
        }
        this.studentsArr.unshift(newStd)
        this.fnameRef.nativeElement.value = '';
        this.lnameRef.nativeElement.value = '';
        this.emailRef.nativeElement.value = '';
        this.contactRef.nativeElement.value = '';
        this.isActiveRef.nativeElement.value = 'true';
        this._snackBarService.openSnackBar('Student information added successfully !!!');

    }

    onStdUpdate(){
        let updateStd :Istd={
            fname : this.fnameRef.nativeElement.value,
            lname : this.lnameRef.nativeElement.value,
            email : this.emailRef.nativeElement.value,
            contact : this.contactRef.nativeElement.value,
            isActive : this.isActiveRef.nativeElement.value === 'true',
            stdId : this.editStdId
        }

        let getIndex = this.studentsArr.findIndex(s=>s.stdId === this.editStdId);
        this.studentsArr[getIndex]=updateStd;
        this.fnameRef.nativeElement.value = ''
        this.lnameRef.nativeElement.value = ''
        this.emailRef.nativeElement.value = ''
        this.contactRef.nativeElement.value = ''
        this.isActiveRef.nativeElement.value ='true'
        this.isInEditMode = false;
        this.editStdId='';
        this._snackBarService.openSnackBar('Student information updated successfully !!!');
    }

    onStdEdit(std : Istd){
        this.isInEditMode = true;
        this.editStdId = std.stdId;
        console.log(std.stdId);
        this.fnameRef.nativeElement.value = std.fname;
        this.lnameRef.nativeElement.value = std.lname;
        this.emailRef.nativeElement.value = std.email;
        this.contactRef.nativeElement.value = std. contact;
        this.isActiveRef.nativeElement.value = std.isActive? 'true':'false';
    }

   onStdRemove(std : Istd){
    let isConfirm = confirm(`Are you sure you want to remove with ${std.stdId}`)
    console.log(std.stdId);
    if(isConfirm){
        let getIndex = this.studentsArr.findIndex(s=>s.stdId===std.stdId);
        this.studentsArr.splice(getIndex, 1);
        if(this.editStdId === std.stdId){

        }
        this.fnameRef.nativeElement.value = ''
        this.lnameRef.nativeElement.value = ''
        this.emailRef.nativeElement.value = ''
        this.contactRef.nativeElement.value = ''
        this.isActiveRef.nativeElement.value ='yes'
        this._snackBarService.openSnackBar('Student removed successfully !!!');
    }
   }
}