/*const proxies = [
    'https://thingproxy.freeboard.io/fetch/',
        'https://cors-anywhere.herokuapp.com/',
    'https://api.codetabs.com/v1/proxy/?quest='
];
let proxyIndex = 0;
let searchbar = document.getElementById('search-input')
const container = document.getElementById('script-container');
async function fetchscripts() { 
    try {
        const pagedatata = await fetch(proxies[proxyIndex] + 'https://scriptblox.com/api/script/fetch');
        const data = await pagedatata.json();
        if (data?.result?.scripts){
            renderscript(data.result.scripts)
        }
    }
    catch  {
        console.log('Error fetching scripts, Swapping proxy...');
        proxyIndex = (proxyIndex + 1) % proxies.length;
        fetchscripts(); // Retry with the next proxy
    }
 }
 const copybtns = document.querySelectorAll('.copybtn');
 function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
       
    }).catch(err => {
        
    });
 }
 function renderscript(scripts) {
    container.innerHTML = '';
    scripts.forEach(script => { 
        const raw = script.image;
                const imageUrl = raw 
                    ? (raw.startsWith('http') ? raw : `https://scriptblox.com${raw}`)
                    : 'https://placehold.co/600x400/232323/808080?text=No+Image';
        const card = document.createElement('div');
        card.className = 'card';
        const luascript = script.script;
        card.innerHTML = `
            <div class="game-image">
                <img src="${imageUrl}" alt="${script.title}" />
            </div>
            </div>
            <div class="title-and-gamename">
                <h2 class="title">${script.title}</h2>
            </div>
            <div class="game-namee">
                <p class="game-name">${script.game.name}</p> 
            </div>
            <div class="keyy">
                <p class="key">Key: ${script.key}</p>
            </div>
            <div class="game-info">
                <p>Game ID: ${script._id}</p>
            </div>
            <div class="copy-script-div">
                <button onclick="copyToClipboard('${luascript}')" class="copybtn">Copy Script</button>
            </div>
        `;
        container.appendChild(card);
    });
 }

async function searchScripts() {
    let content = searchbar.value;
    console.log('test');
    if (content) {
        console.log('Searching for scripts...');
        container.innerHTML = '<p style="color: #fff;">Loading scripts...</p>';
        const search = `https://scriptblox.com/api/script/search?q=${encodeURIComponent(content)}`
        const pagedatata = await fetch(proxies[proxyIndex] + search);
        const data = await pagedatata.json();
        if (data?.result?.scripts) {
            renderscript(data.result.scripts);
        } else {
            container.innerHTML = '<p>No scripts found.</p>';
        }
    }
    else {
        container.innerHTML = '<p style="color: #fff;">Type something in...</p>';
    }
}

searchbar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log('Enter key pressed, searching scripts...');
        searchScripts();
    }
});

 fetchscripts();
 */








const proxies = [
	'https://thingproxy.freeboard.io/fetch/',
	'https://cors-anywhere.herokuapp.com/',
	'https://api.codetabs.com/v1/proxy/?quest='
];
let proxyIndex = 0;
let searchbar = document.getElementById('search-input')
const container = document.getElementById('script-container');
const bosscontainer = document.getElementById('script-containers-holder');
let trending = false;
let search = false;
let defaultt = false;
async function fetchscripts(choice) {
	try {
		const pagedatata = await fetch(proxies[proxyIndex] + 'https://scriptblox.com/api/script/fetch');
		const data = await pagedatata.json();
		if (data?.result?.scripts) {
			renderscript(data.result.scripts, choice);
            defaultt = true;
            trending = false;
            search = false;
		}
	} catch {
		console.log('Error fetching scripts, Swapping proxy...');
		proxyIndex = (proxyIndex + 1) % proxies.length;
		fetchscripts(); // Retry with the next proxy
	}
}
async function fetchTrendingScripts(choice) {
	try {
		const pagedatata = await fetch(proxies[proxyIndex] + 'https://scriptblox.com/api/script/trending');
		const data = await pagedatata.json();
		if (data?.result?.scripts) {
			renderscript(data.result.scripts, choice);
            trending = true;
            search = false;
            defaultt = false;
		}

	} catch {
		console.log('Error fetching scripts, Swapping proxy...');
		proxyIndex = (proxyIndex + 1) % proxies.length;
		fetchscripts(); // Retry with the next proxy
	}
}

const copybtns = document.querySelectorAll('.copybtn');

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {

	}).catch(err => {

	});
}

function renderscript(scripts, type) {
	container.innerHTML = '';
	scripts.forEach(script => {
		const raw = script.image;
		const imageUrl = raw ?
			(raw.startsWith('http') ? raw : `https://scriptblox.com${raw}`) :
			'https://placehold.co/600x400/232323/808080?text=No+Image';
		const card = document.createElement('div');
		card.className = 'card nonvisible';
		const luascript = script.script;
		card.innerHTML = `
            <div class="game-image">
                <img src="${imageUrl}" alt="${script.title}" />
            </div>
            </div>
            <div class="title-and-gamename">
                <h2 class="title">${script.title}</h2>
            </div>
            <div class="game-namee">
                <p class="game-name">${script.game.name}</p> 
            </div>
            <div class="keyy">
                <p class="key">Key: ${script.key}</p>
            </div>
            <div class="game-info">
                <p>Game ID: ${script.game._id}</p>
                <p style="display: inline-block; margin-top: 2px;">Views: ${script.views}</p>
            </div>
            <div class="copy-script-div">
                <button onclick="copyToClipboard('${luascript}')" class="copybtn">Copy Script</button>
            </div>
        `;
		container.appendChild(card);
        intersectionObserver.observe(card);
	});
}

async function searchScripts() {
	let content = searchbar.value;
	console.log('test');
	if (content) {
		console.log('Searching for scripts...');
		container.innerHTML = '<p style="color: #fff;">Loading scripts...</p>';
		const search = `https://scriptblox.com/api/script/search?q=${encodeURIComponent(content)}`
		const pagedatata = await fetch(proxies[proxyIndex] + search);
		const data = await pagedatata.json();
		if (data?.result?.scripts) {
			renderscript(data.result.scripts);
		} else {
			container.innerHTML = '<p>No scripts found.</p>';
		}
	} else {
		container.innerHTML = '<p style="color: #fff;">Type something in...</p>';
	}
}

searchbar.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		console.log('Enter key pressed, searching scripts...');
		searchScripts();
	}
});

fetchscripts();
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('visible') || entry.target.classList.contains('nonvisible')) 
                {
                    console.log('Element is visible');
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('nonvisible');
                } 
        }
        else {
           entry.target.classList.remove('visible');
              entry.target.classList.add('nonvisible');
            } 
    });
}, {
    threshold: 0.1 
});
const intersectionObserver2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('visible2') || entry.target.classList.contains('nonvisible2')) 
                {
                    console.log('Element is visible');
                    entry.target.classList.add('visible2');
                    entry.target.classList.remove('nonvisible2');
                } 
        }
        else {
           entry.target.classList.remove('visible2');
              entry.target.classList.add('nonvisible2');
            } 
    });
}, {
    threshold: 0.1 
});


const timeoutId = setTimeout(() => {
   let tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
    intersectionObserver2.observe(button);
});
}, 1000); 