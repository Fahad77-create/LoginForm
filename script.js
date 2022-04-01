    const uName = document.querySelector("#user");
    const pass = document.querySelector("#pass");
    const sign_In = document.querySelector("#signIn");
    const show_Hide = document.querySelector("#eye");
    const sign_Up = document.querySelector('#signUp');
    const uName_2 = document.querySelector("#user_2");
    const pass_2 = document.querySelector("#pass_2");
    const pass_3 = document.querySelector("#pass_3");
    const Email = document.querySelector("#eMail");

    // Setting a random Account info
    if (localStorage.getItem('savedInfo') === null) {
        let savedInfo = [{ Nme: "Fahad", Pass: "12345678", eMail: "123@gmail.com" }];
        localStorage.setItem('savedInfo', JSON.stringify(savedInfo))
    }

    // Setting Alert
    class Alert {
        static detail(className, message) {
            const div = document.createElement('div');
            div.className = `alert alert-${className}`
            div.appendChild(document.createTextNode(message));
            let Form = document.querySelector("#form");
            let tab = document.querySelector('#tab-1')
            Form.insertBefore(div, tab)

            setTimeout(() => {
                div.remove()
            }, 2000);
        }
    }

    // For Sign-In 
    sign_In.addEventListener('click', e => {
        e.preventDefault();
        const userNme = uName.value;
        const password = pass.value;

        let savedInfo = JSON.parse(localStorage.getItem('savedInfo'))

        for (let i = 0; i < savedInfo.length; i++) {
            if (userNme === '' && password === '' || userNme != '' && password === '' || userNme === '' && password != '') {
                Alert.detail('warning', 'Fill all fields')
                break;
            }
            if (userNme != savedInfo[i].Nme || password != savedInfo[i].Pass) {
                    uName.style.border='1px solid red'
                    pass.style.border='1px solid red'
                    setInterval(() => {
                        uName.style.border='none'
                        pass.style.border='none'
                    }, 1);
                }
                if (userNme === savedInfo[i].Nme && password === savedInfo[i].Pass) {
                    uName.style.border='1px solid green'
                    pass.style.border='1px solid green'
                    setInterval(() => {
                        uName.style.border='none'
                        pass.style.border='none'
                    }, 1);
                    location.assign("page.html")
                    break;
                }
        }
        if(uName.style.border==='1px solid red' && pass.style.border==='1px solid red'){
            Alert.detail('danger', 'Account not found')
        }
    })

    // For Sign-Out
    sign_Up.addEventListener('click', e => {
        e.preventDefault();
        if (uName_2.value === '' || pass_2.value === '' || pass_3.value === '' || Email.value === '') {
            Alert.detail('warning', 'Fill the fields')
        }

        if (uName_2.value != '' && pass_2.value != '' && pass_3.value != ''
            && Email.value != '' && pass_2.value.length <= 7) {
            Alert.detail('warning', 'Password of Atleast 8 chracters')
            pass_2.style.border = '1px solid red'
        }

        if (pass_2.value !== pass_3.value) {
            Alert.detail('danger', 'Password not matched')
            pass_3.style.border = '1px solid red'
        }

        // Checking weather the given Email is already register or not
        savedInfo = JSON.parse(localStorage.getItem('savedInfo'))
        for ( i = 0; i < savedInfo.length; i++) {
            if (savedInfo[i].eMail === Email.value) {
                Alert.detail('warning', `user ${savedInfo[i].Nme} is already using this Email`)
                Email.style.border = '1px solid red';
                setInterval(() => {
                    Email.style.border = 'none';
                }, 2000);
                break;
            }
        }

        // Regex for Email validation
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value) === false){
            Alert.detail('danger', `Invalid Email`)
            Email.style.border = '1px solid red';
        }
        // if All above requirment is served, Account will created
            if (uName_2.value != '' && pass_2.value != '' && Email.value != '' && pass_3.value != '' &&
            pass_2.value === pass_3.value && pass_2.value.length >= 8 &&  Email.style.border != '1px solid red') {

            let info = {
                Nme: uName_2.value,
                Pass: pass_2.value,
                eMail: Email.value,
            }

            savedInfo = JSON.parse(localStorage.getItem('savedInfo'))
            savedInfo.push(info);
            localStorage.setItem('savedInfo', JSON.stringify(savedInfo))

            Alert.detail('success', 'Account created')
            uName_2.value = '';
            pass_2.value = '';
            pass_3.value = '';
            pass_3.style.border = 'none'
            pass_2.style.border = 'none'
        }
    })

    // Password show/hide btn
    show_Hide.addEventListener('click', e => {
        const pass = document.querySelector("#pass")
        pass.getAttribute('type')
        if (show_Hide.className === 'fa-solid fa-eye') {
            show_Hide.className = 'fa-solid fa-eye-slash';
            pass.setAttribute('type', 'password')
        }
        else {
            show_Hide.className = 'fa-solid fa-eye';
            pass.setAttribute('type', 'text/number')
        }
    })