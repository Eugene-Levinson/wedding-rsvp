import bodyParser from "body-parser";
import {config} from "../config"
import * as db_coms from './db_coms'

export async function indexPage(req:any, res:any) {
    var data:any;
    data = []
    
    res.status(200)
    res.render('index.html', {data: data})

}

export async function rsvpPage(req:any, res:any) {
    var data:any;
    data = []
    
    res.status(200)
    res.render('rsvp.html', {data: data})

}

export async function submitData(req:any, res:any) {

    try{

        // connect to db
        let creds: db_coms.Creds = {
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: "wedding_rsvp"
        }

        let query = await db_coms.connectdb(creds)

        var conn = query[0]
        let conn_error = query[1]

        if (conn_error){
            res.status(500)
            res.send({"error": "Ooops, error connecting to the database", msg:null})
            return
        }

        //start the db transaction
        await conn.awaitBeginTransaction()



        // VERIFICATION OF DATA
        // Check that attending is not null
        if (req.body.names == null || req.body.names == undefined || req.body.names == ""){
            res.status(422)
            res.send({"error": "Ooops, You forgot to include your names. Please let us know you are by listing the names in the form.", "msg":null}) 
            return
        }


        // Check that attending is not null
        if (req.body.attending == null){
            res.status(422)
            res.send({"error": "Ooops, you forgot to indicate if you are coming to the wedding. Please make sure to select 'Yes' or 'No'.", "msg":null}) 
            return

        // If they responded no
        } else if (req.body.attending == false){
            var noQ = await db_coms.add_responce_no(conn, req.body.names, false)

            var req_err = noQ[1]

            if (req_err){
                res.status(500)
                res.send({"error": "Ooops, there was an error. Please try again. Your responce was NOT recorded.", msg:null})
                return
            }

            res.status(200)
            res.send({"error": null, "msg":"Sorry you cannot attend on our wedding day. We hope to catch up with you soon!"}) 

        // If they responded yes
        } else if (req.body.attending == true){

            // Check if accom options are selected
            if (req.body.accom_req == null){
                res.status(422)
                res.send({"error": "Ooops, you forgot to indicate if you require accomodation or not. Please make sure to select 'Yes' or 'No'.", "msg":null}) 
                return

            } else if (req.body.accom_req == true && req.body.accom_info == ""){
                res.status(422)
                res.send({"error": "Ooops, you indicated that you reuquire accomodation, but did not provide the name of the people staying. Please provide list of names that will be staying.", "msg":null}) 
                return
            }

            // Check if coach options are selected
            if (req.body.coach_req == null){
                res.status(422)
                res.send({"error": "Ooops, you forgot to indicate if you require a coach or not. Please make sure to select 'Yes' or 'No'.", "msg":null}) 
                return

            } else if (req.body.coach_req == true && req.body.coach_head == ""){
                res.status(422)
                res.send({"error": "Ooops, you indicated that you reuquire a coach, but did not provide the number of poeple who require a coach. Please enter how many people require a coach.", "msg":null}) 
                return
            }

            // check contact details
            if (req.body.contact_email == ""){
                res.status(422)
                res.send({"error": "Ooops, you did not provide a contact email.", "msg":null}) 
                return

            }

            var yesQ = await db_coms.add_responce_yes(conn, req.body.names, req.body.attending, req.body.diet_req, req.body.accom_req, req.body.accom_info, req.body.coach_req, req.body.coach_head, req.body.contact_email)
            var req_err = yesQ[1]

            if (req_err){
                res.status(500)
                res.send({"error": "Ooops, there was an error. Please try again. Your responce was NOT recorded.", msg:null})
                return
            }


            res.status(200)
            res.send({"error": null, "msg":"Thank you for getting back to us. We cannot wait to share our special day with you."}) 
        
        // Just incase weird edge case
        } else {
            res.status(400)
            res.send({"error": "Ooops, something went wrong, please try again", "msg":null})
            return
        }

        //save all db changes
        await conn.awaitCommit()

    } catch(e){
        console.log(e)
        res.status(500)
        res.send({"error": "Ooops, something went wrong, please try again", "msg":null})

    } finally {
        conn.awaitEnd()
    }
}
