/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function feedbackToUser() {
    var textToReturnToUser = "";

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var genderMale = document.getElementById("genderMale").checked;
    var genderFemale = document.getElementById("genderFemale").checked;
    var likingMyPage = document.getElementById("likingMyPage").checked;
    var dislikingMyPage = document.getElementById("dislikingMyPage").checked;

    if ((firstName !== "" && lastName !== "")&&(genderMale || genderFemale) && (likingMyPage || dislikingMyPage)) {
        if (genderMale) {
            textToReturnToUser = "Hello Mr." + firstName + " " + lastName + ". ";
        }
        else if (genderFemale) {
            textToReturnToUser = "Hello Ms." + firstName + " " + lastName + ". ";
        }

        if (likingMyPage) {
            textToReturnToUser = textToReturnToUser + "I'm glad you like my page, and I hope you will visit me again";
        }
        else if (dislikingMyPage) {
            textToReturnToUser = textToReturnToUser + "I'm sad that you dislike my page, but I hope you will give me another chance and visit me at a later time, maybe then you will change your mind.";
        }
        document.getElementById("feedback").innerHTML = textToReturnToUser;
    }
    else {
        textToReturnToUser = "Please fill in all the fields";
        document.getElementById("feedback").innerHTML = textToReturnToUser;
    }
}

