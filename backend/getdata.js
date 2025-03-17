export const getdata = async () => {

const url = 'https://covid-193.p.rapidapi.com/statistics';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'f9cb754163mshe2cbcce3720e6f0p1b07ccjsnbe956ebcc81d',
    'x-rapidapi-host': 'covid-193.p.rapidapi.com'
  }
};


	const response = await fetch(url, options);
    return response.json();
    

}

getdata();