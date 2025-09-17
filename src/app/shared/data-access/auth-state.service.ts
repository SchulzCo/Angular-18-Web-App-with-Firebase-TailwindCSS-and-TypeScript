import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})
export class authstateservice{
    private _auth = inject(Auth);
}



