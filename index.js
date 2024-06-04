let form = document.getElementById('userinput');
let showusers = document.getElementById('showusers');
let userdetails = document.getElementById('userdetalis');
let showdetalis = document.getElementById('showdetalis');
let closebtn = document.getElementById('close');
let updatedetial = document.getElementById('updatedetial');
let deletedetail = document.getElementById('deletedetail');
let updateform = document.getElementById('updateform');
let uid = document.getElementById('uid');
let userlist = [];
let duplicateid = false;
let rem = 0;
let currentid = 0;


function displaydata(user)
{
    
    showusers.innerHTML = ''

    userlist.forEach((eachuser) => {
        let users = document.createElement('div')
        users.classList.add('users')
        users.innerHTML = ` <span>${eachuser.id}</span>${eachuser.name}`
        showusers.appendChild(users)
        users.addEventListener('click', () => handleclick(eachuser));
    })
}


closebtn.addEventListener('click', ()=>userdetails.classList.remove('show'))


function handleclick(e) 
{
    currentid = e.id;
    userdetails.classList.add('show')
    showalldata(e)
    hideupdate()
}


form.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        let obj = {
            id: e.target[0].value,
            name: e.target[1].value,
            age: e.target[2].value
        }


        userlist.forEach((e) => {
            if(obj.id == e.id)
                {
                    duplicateid = true;
                    return 0;
                }
        });
    
        

        if(duplicateid == true)
            {
                if(rem.parentNode == uid)
                    {
                        uid.removeChild(rem)
                    }
                rem = document.createElement('p')
                uid.appendChild(rem)
                rem.innerText = 'This id already exists*'
                duplicateid = false;
            }

        else
            {
                if(rem.parentNode == uid)
                    {
                        uid.removeChild(rem)
                    }
               
                userlist.push(obj);
                displaydata(userlist)
                e.target[0].value = "";
                e.target[1].value = "";
                e.target[2].value = "";
            }

    }
)


form.addEventListener('reset', (e)=>{
    if(rem.parentNode == uid)
        {
            uid.removeChild(rem)
        }
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    }
)

function showalldata(e)
{
    showdetalis.innerHTML = `
    <p>id: ${e.id}</p>
    <p>name:  ${e.name}</p>
    <p>age: ${e.age}</p>
    `
}

deletedetail.addEventListener('click', (e)=>
    {
        userlist.forEach((eForArr, i) => {
            if(eForArr.id == currentid)
                {
                    userlist.splice(i, 1);
                    displaydata(userlist);
                    userdetails.classList.remove('show')
                }
        })
    }
);

updatedetial.addEventListener('click', ()=>
    {
        updateform.classList.add('show');
    }
)

function hideupdate(e = document.getElementsByClassName('upinpt'))
{
        updateform.classList.remove('show');
        e.target[0].value = "";
        e.target[1].value = "";
        
}


updateform.addEventListener('submit', (e)=>
    {
        e.preventDefault()

        userlist.forEach((eForArr, i) => 
            {
                if(eForArr.id == currentid)
                    {
                        if(e.target[0].value !== "")
                            {
                                eForArr.name = e.target[0].value;
                            }
                        
                        if(e.target[1].value !== "")    
                            {
                                 eForArr.age = e.target[1].value;
                            }
                       
                        displaydata(userlist);  
                        showalldata(eForArr); 
                    }
            })
        hideupdate(e);
        
    }
)

updateform.addEventListener('reset', (e)=> 
    {
        hideupdate(e)
    }
);