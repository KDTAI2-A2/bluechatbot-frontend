$(document).ready(function() {
    const init = async () => {
        const data = await axios.get(
            "https://limitless-ridge-83393.herokuapp.com/frontend/getUsers/", 
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );
        tableCreate_id(data);

        return data;
    };

//    console.log(init);

    let response = init();

    function tableCreate_id(data){
        var tc = new Array();
        var html = '';

        console.log(data);
        if (data.data !== null)
        {
            for (let i = 0; i < data.data.length; i++) {
                let temp = data.data[i];
                console.log(temp);

                tc.push({id : temp['id'], kakao : temp["kakao_id"] }); 
            }
        }        
        
        html += "<thead><tr><th>id</th><th>kakao_id</th></tr></thead>";

        for(key in tc){
            html += '<tr id="tcid_'+tc[key].kakao + '" onClick="reply_click_id(this.id)">';
            html += '<td><U style="color:blue;cursor:pointer">'+tc[key].id+'</U></td>';
            html += '<td>'+tc[key].kakao+'</td>';
            html += '</tr>';
        }
                    
        $("#dynamicTbody_id").empty();
        $("#dynamicTbody_id").append(html);
    }
});

let g_userid = "";

function tableCreate_date(data){
    var tc = new Array();
    var html = '';

    if (data.data !== null)
    {
        for (let i = 0; i < data.data.length; i++) {
            let temp = data.data[i];
            console.log(temp);

            tc.push({date:temp["date"], id : temp['id'], kakao : temp["kakao_id"] }); 
        }
    }        
    
    for(key in tc){
        html += '<tr id="tcid_'+ tc[key].date + '"onClick="reply_click_date(this.id)">';
        html += '<td><U style="color:blue; cursor:pointer">'+ tc[key].date+'</U></td>';
        html += '</tr>';
    }
    
    $("#dynamicTbody_date").empty();
    $("#dynamicTbody_date").append(html);
}

function reply_click_id(id) {
    let userid = id.substring(5);
    g_userid = userid;

    const init = async () => {
        const data = await axios.get(
            "https://limitless-ridge-83393.herokuapp.com/frontend/getUser/" + userid + "/",             
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );

        console.log(data);
        tableCreate_date(data);
        return data;
    };

    let response = init();
    $("#dynamicTbody_date").empty();        
    $("#dynamicTbody_chat").empty();
}

function reply_click_date(id) {
    let date = id.substring(5);

    const init = async () => {
        const data = await axios.get(
            "https://limitless-ridge-83393.herokuapp.com/frontend/getUser/" + g_userid + "/getDate/" + date + "/",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        console.log(data);
        fill_chat_log(data);
       
        return data;
    };

    let response = init();
}

function fill_chat_log(data)
{
    var html = "";

    if (data.data !== null)
    {
        let botMessage = data.data["bot_message"];
        let userMessage = data.data["user_message"];

        for (let i = 0; i < botMessage.length; i++)
        {
            html += "<div>" + botMessage[i] + "</div><br>";
            html += "<div style='text-align: right;'>" + userMessage[i] + "</div><br>";
        }
    }        

    $("#dynamicTbody_chat").empty();
    $("#dynamicTbody_chat").append(html);
}