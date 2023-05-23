const baseUrl = 'http://uskumru.sabanciuniv.edu:5063/api/CompanyUserAuth/ResetPassword';

export const resetPassword = (user: any) =>{
    return fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: user.userId,
            usermail: user.usermail,
            password: user.password,
            userType: user.userType,
            username: user.username,
            CompanyId: user.CompanyId,
        }),
    }).then((response) => response.json()).catch(function(error){
        console.log('resetpassword error' + error.message);
        throw error;
    });
}