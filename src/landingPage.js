import Data from './data/taglines.json';
import loadProjectPage from './projectPage';

export default function loadLandingPage(){
    let header = document.querySelector(`.header`);
    let landingPage = document.createElement(`div`);
    landingPage.className = `landing-page`;
    header.after(landingPage);

// Populate the page with taglines

    Data.forEach((tagline) => {
        let div = document.createElement(`div`);
        let p = document.createElement(`p`);
        div.className = `tagline`;
        div.innerHTML = `${tagline["tagline"]}`;
        p.innerHTML = `${tagline["pitch"]}`;
        landingPage.append(div,p);
    });

    let secondTagline = document.querySelector(`.tagline:nth-of-type(2)`);
    let button = document.createElement(`button`);
    button.className = `start-button`;
    button.innerHTML = `Start your project`;
    secondTagline.before(button);
    let secondButton = button.cloneNode(true);
    landingPage.append(secondButton);

// Buttons linking to the Projects page

    // document.querySelectorAll(`.start-button`).forEach((button)=> 
    //     button.addEventListener(`click`, ()=> 
    //         loadProjectPage()));

    document.querySelectorAll(`.start-button`).forEach((button)=> 
        button.addEventListener(`click`, function (){
            
            document.querySelector(`.landing-page`).remove();
            loadProjectPage();
        })
    );
};