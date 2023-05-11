const baseUrl = 'http://uskumru.sabanciuniv.edu:5063/api/CompanyContoller';

export const loadCompanies = () => {
    return fetch(baseUrl).then((response)=>response.json()).catch(function(error){
        console.log('loadCompanies error' + error.message);
        throw error;
    });
}

export const getCompanyByDomain = (domain: any) => {
    const url = `http://uskumru.sabanciuniv.edu:5063/api/CompanyContoller/GetCompanyByDomain?domain=${domain}`;

    return fetch(url).then((response) => response.json()).catch(function(error){
        console.log('getBuilding error' + error.message);
        throw error;
    });
}