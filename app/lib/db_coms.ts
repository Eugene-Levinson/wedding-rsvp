const mysql = require(`mysql-await`)
import {config} from '../config'

export interface Creds {
    host: string,
    user: string,
    password: string,
    database: string
}

export async function connectdb(creds: Creds){
    try{
        //create a connection object
        let conn = mysql.createConnection(creds)
        
        return [conn, null]

    } catch(e){
        console.log(e)
        console.log("Error connecting to database")
        return [null, e]
    }   
}


export async function send_sql(conn: any, sql_code: string){
    try{
        let result = await conn.awaitQuery(sql_code)
        return [result, null]

    } catch(e){
        console.log(e)
        return [null, e]
    }
}

export async function add_responce_no(conn: any, names:string, attending:boolean){
    try{
        let sql_code = `INSERT INTO responces (names, attending) VALUES (${conn.escape(names)}, ${conn.escape(attending)})`
        let result = await conn.awaitQuery(sql_code)

        return [result, null]

    } catch(e){
        console.log(e)
        return [null, e]
        
    }
}

export async function add_responce_yes(conn: any, names:string, attending:boolean, diet:string, accom:boolean, accom_info:string, coach:boolean, coach_head:string, email:string){
    try{
        let sql_code = `INSERT INTO responces (names, attending, diet, need_accom, accom_details, need_coach, coach_head_count, email) VALUES (${conn.escape(names)}, ${conn.escape(attending)}, ${conn.escape(diet)}, ${conn.escape(accom)}, ${conn.escape(accom_info)}, ${conn.escape(coach)}, ${conn.escape(parseInt(coach_head))}, ${conn.escape(email)})`
        let result = await conn.awaitQuery(sql_code)

        return [result, null]

    } catch(e){
        console.log(e)
        return [null, e]
        
    }
}