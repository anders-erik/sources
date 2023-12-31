//import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';
//import { createSourcefindPanel, createSourceviewPanel,createVerticalSerperationPanel, createShardlistPanel } from './Panels.js';

import * as mainMenu from './mainMenu/mainMenu.js';

import * as Sourcing from './sourcing/sourcing.js';

import * as Homedash from './homedash/homedash.js';



import * as log from './log/log.js';



function initApp(rootId){

	let root = document.getElementById(rootId);

	root.appendChild(mainMenu.createMainMenu());
	
	let mainContent = document.createElement('div');
	mainContent.id = 'mainContent';
	root.appendChild(mainContent);



	let urlPath = window.location.pathname;
	let urlPathBase = urlPath.split('/')[1];
	// window.location.pathname.split('/')[1]


	if(urlPathBase === 'sourcing'){
		//console.log('sourcing detected');
		//loadSourcing();
		let urlPathId = urlPath.split('/')[2]
		Sourcing.loadSourcing(urlPathId);
	}
	else{
		Homedash.loadHomedash();
	}

}











export {
	initApp,
}
