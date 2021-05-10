import { Component } from '@angular/core';

@Component({
    selector:'error-404',
    template:`
        <div class='container'>
            <div class='row'>
                <div class='col-12 text-center mt-5'>
                    <h1 class='display-1 mb-0'>404</h1>
                    <p class='larger'>Not Found</p>
                    <a href='/'>Return Home</a>
                </div>
            </div>
        </div>
    `
})
export class Error404{
    constructor(
    ){}
}
