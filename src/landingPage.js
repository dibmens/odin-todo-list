import Data from './data/taglines.json';

export default function loadLandingPage(){
    let content = document.querySelector(`.content`);

    let intro = document.createElement(`div`);
    intro.className = `intro`;
    content.append(intro);

    Data.forEach((tagline) => {
        let div = document.createElement(`div`);
        let p = document.createElement(`p`);
        div.className = `tagline`;
        div.innerHTML = `${tagline["tagline"]}`;
        p.innerHTML = `${tagline["pitch"]}`;
        intro.append(div,p);
    });

    let firstParagraph = document.querySelector(`.intro :nth-child(2)`);
    let button = document.createElement(`button`);
    button.className = `start-button`;
    button.innerHTML = `Start your project`;
    firstParagraph.append(button);

    let secondButton = button.cloneNode(true);
    intro.append(secondButton);
}