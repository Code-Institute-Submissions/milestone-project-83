$('document').ready(function(){
/* Navigation betwwen Profile Cards */
    userProfileNav("#update-profile-link", "#profile-card", "#update-profile-card")
    userProfileNav("#update-nav-back", "#update-profile-card", "#profile-card")
    userProfileNav("#update-password-link", "#profile-card", "#update-password-card")
    userProfileNav("#password-nav-back", "#update-password-card", "#profile-card")
    userProfileNav("#delete-profile-link", "#update-profile-card", "#delete-profile-card")
    userProfileNav("#delete-nav-back", "#delete-profile-card", "#profile-card")
    // clear input fields and validation classes on navigating away from card
     $("#delete-nav-back, #password-nav-back").click(function(){
        $('.reload-reset').val("").removeClass("valid invalid");
    })

/* Update Profile Form Elements */
     // change currency colours on switch
    $("#currency-switch").on("click", function(){
        $("#switch-off, #switch-on").toggleClass("header-blue")
    })

/* Update Profile Form Valiation */
    //clientside validation: fname 
    //clientside validation: lname
    //clientside validation: email
    //clientside validation: pw confirm 
    $("#password").on({
        focusout: function(){
             if (!$(this).val()){
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", "Please enter your password");
            } else if ($(this).val().length < 6) {
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length} characters`);
            }
        },
        keydown: function(e){
            if (e.key === "Backspace" || e.key === "Delete"){
                if ($(this).val().length < 7) {
                    $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length - 1} characters`)
                }
            } else if ($(this).val().length < 5 && $(this).hasClass("invalid")) {
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length + 1} characters`)
            }
        }, 
        keyup: function(){
            if($(this).val().length > 5){
                $(this).removeClass("invalid").addClass("valid")
            } else if ($(this).val().length == 0){
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", "Please enter your password")
            }
        }
    }); 

/* Delete User Form Validation */
    // clientside validation: delete user 
    $("#password_delete").on({
        focusout: function(){
             if (!$(this).val()){
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", "Please enter your password");
            } else if ($(this).val().length < 6) {
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length} characters`);
            }
        },
        keydown: function(e){
            if (e.key === "Backspace" || e.key === "Delete"){
                if ($(this).val().length < 7) {
                    $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length - 1} characters`)
                }
            } else if ($(this).val().length < 5 && $(this).hasClass("invalid")) {
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", `Your password is longer than ${$(this).val().length + 1} characters`)
            }
        }, 
        keyup: function(){
            if($(this).val().length > 5){
                $(this).removeClass("invalid").addClass("valid")
            } else if ($(this).val().length == 0){
                $(this).removeClass("valid").addClass("invalid").next().attr("data-error", "Please enter your password")
            }
        }
    });

/* Update Password Form Validation */
    //clientside validation: update password
    $("#oldpassword").on({
       focusout: function(){
            if (!$(this).val()){
                $(this).addClass("invalid");
            }
            $(this).removeClass("valid") // never want this to show as valid as not doing clientside password auth
        }, 
        keydown: function(e){
            if (e.key === "Backspace" || e.key === "Delete"){
                if ($(this).val().length == 6 ) {
                    $(this).addClass("invalid");
                }
            }
        },
        keyup: function(e){ 
            if ($(this).val().length == 0) {
                $(this).addClass("invalid");
            } else if ($(this).val().length == 6) {
                $(this).removeClass("invalid");
            }
        }   
    })
    // clientside validation: new password
     $("#newpassword").on({
        focusout: function(){
            if ($(this).val().length < 6) {
                $(this).addClass("invalid").attr("data-error", "Password must use 6+ characters");
            }
        },
        keydown: function(e){
            if (e.key === "Backspace" || e.key === "Delete"){
                if ($(this).val().length == 6) {
                    $(this).removeClass("valid").addClass("invalid").next().attr("data-error", "Password must use 6+ characters")
                }
            }
        }, 
        keyup: function(){
            if ($(this).val().length == 6){
                $(this).removeClass("invalid").addClass("valid")
            }
        }
    })
    // clientside validation: new password check 
    $("#newpasswordcheck").on({
        focusout: function(){
            if ($(this).val() != $("#newpassword").val() && $("#newpassword").val().length > 6){
                $(this).removeClass("valid").addClass("invalid")
            }
            if ($(this).val().length < 6 && $("#newpassword").val().length > 6){
                $(this).addClass("invalid")
            } else if ($(this).val().length > 6 && $("#newpassword").val() == $(this).val()){
                $(this).addClass("valid").next().attr("data-success", "Passwords match")
            }
        }, 
        keyup: function(){
            if($(this).hasClass("valid")){
                $(this).removeClass("valid").addClass("invalid")
            }
             if ($(this).val().length > 6 && $("#newpassword").val() == $(this).val()){
                $(this).removeClass("invalid").addClass("valid").next().attr("data-success", "Passwords match")
            }
        }
    })
    // validate form input before submitting form
    $('#update-pw-submit').click(function(e) {
        e.preventDefault();
        if (!$("#oldpassword, #newpassword, #newpasswordcheck").val()){
            M.toast({html: 'Please make sure all fields are filled in', classes: 'flash'})
        } else if ($("#oldpassword").val().length < 6) {
            M.toast({html: 'Your existing password isn\'t entered correctly', classes: 'flash'})
        } else if ($("#newpassword").val() != $("#newpasswordcheck").val()){
            M.toast({html: 'It looks like your new passwords don\'t match', classes: 'flash'})
        } else if ($("#newpassword").val().length < 6){
            M.toast({html: 'Your new password must be longer than 6 characters', classes: 'flash'})
        } else {
            $("#update-pw-form").submit();
        }
    });
})

function userProfileNav(el1, el2, el3) {
    // nav between user profile cards
    $(el1).click(function(){
        $(el2).addClass("display-none");
        $(el3).removeClass("display-none");
    })
}