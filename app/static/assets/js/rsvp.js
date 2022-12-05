    // Function to display a boostrap alert
    function display_msg(msg_box, msg, alert_type){
        msg_box.innerHTML = `
            <div class="alert alert-${alert_type}" role="alert">
                ${msg}
            </div>
        `
    }

    async function submit(){
        //Get RSVP yes or no
        var noTickBox = document.querySelector("#attending[value='no']").checked
        var yesTickBox = document.querySelector("#attending[value='yes']").checked

        var allert_box = document.getElementById("alerts")

        if (yesTickBox){
            var names = document.getElementById("names").value
            var dietary_requirements = document.getElementById("dietary-requirements").value

            var noAccom = document.querySelector("#accom[value='no']").checked
            var yesAccom = document.querySelector("#accom[value='yes']").checked

            var accom_info = document.getElementById("accom-requirements").value

            var noCoach = document.querySelector("#coach[value='no']").checked
            var yesCoach = document.querySelector("#coach[value='yes']").checked

            var coach_headcount = document.getElementById("coach-head-count").value

            var contact_email =  document.getElementById("dietry-requirements").value

            if (!yesAccom && !noAccom){
                var accom_req = null

            } else {
                var accom_req = yesAccom
            }

            if (!yesCoach && !noCoach){
                var coach_req = null

            } else {
                var coach_req = yesCoach
            }



            var data = {
                "names": names,
                "attending": true,
                "diet_req": dietary_requirements,
                "accom_req": accom_req,
                "accom_info": accom_info,
                "coach_req": coach_req,
                "coach_head": coach_headcount,
                "contact_email": contact_email
            }


        } else if (noTickBox){
            var names = document.getElementById("names").value

            var data = {"names": names,
                        "attending": false}

        } else {
            var names = document.getElementById("names").value
            var data = {"names": names,
            "attending": null}

        }

        try{
            var req = await fetch("/rsvp", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var resp = await req.json()


            if (resp.error != null){
                display_msg(allert_box, resp.error, "danger")
                
            } else if (req.status != 200){
                display_msg(allert_box, `Ooops, something went wrong. Please try again`, "danger")

            } else {
                allert_box.innerHTML = ""
                var cont = document.getElementById("form-container")
                cont.innerHTML = `
                <div class="card text-white bg-success mb-3" style="font-size: 30px">
                <div class="card-header">Responce submitted!</div>
                <div class="card-body">
                    ${resp.msg}
                </div>
              </div>`
            }

            console.log(resp)

        } catch(e){
            console.log(e)
            display_msg(allert_box, `Ooops, something went wrong. Please try again`, "danger")

        }
    }

    // Get a reference to the form and the submit button
    var noTickBox = document.querySelector("#attending[value='no']")
    var yesTickBox = document.querySelector("#attending[value='yes']")
    var msg_box = document.getElementById("msg-box")

    var if_yes_content = document.getElementById("if-yes")

    var rsvp_yes = null

    // Check for attending checkbox "no" to be ticked
    noTickBox.addEventListener("change", function() {
    
        if (this.checked) {
            var alert_message = "Sorry you cannot attend on our wedding day. We hope to catch up with you soon!"
            display_msg(msg_box, alert_message, "secondary")
            if_yes_content.style.display = "none"
            
        } else {
            msg_box.innerHTML = ""
        }
    })

    // Reset msg if yes is selected
    yesTickBox.addEventListener("change", function() {

        if (this.checked) {
            msg_box.innerHTML = ""
            if_yes_content.style.display = "block"

        } else {
            if_yes_content.style.display = "none"
        }
    })

    $(document).ready(function(){

        $('.rsvp-tick').click(function() {
           $('.rsvp-tick').not(this).prop('checked', false);
        });

        $('.accom-tick').click(function() {
            $('.accom-tick').not(this).prop('checked', false);
         });

         $('.coach-tick').click(function() {
            $('.coach-tick').not(this).prop('checked', false);
         });
  
     });