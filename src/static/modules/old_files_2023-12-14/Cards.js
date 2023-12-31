import { /* populateSourceList, loadSourceViewerHeader, addNewSource, */ fetchSourcesClicked, addSourceClicked, sourceCardClicked, sourceviewFieldFocusout, deleteSourceClicked, uploadSourceFilePressed, loadSourceFilePressed } from "./DOMEvents.js";
//import { /* createSourceViewerHeaderField, */ createInputElement, createButtonElement, createReadElement, getSosLabel, getSosInput, getSosDisabledInput  } from "./Elements.js";
import * as Elements from './Elements.js';

/* 
function addSourceListHeader() {
	let sourceListHeader = document.createElement('div');
	sourceListHeader.id = 'source-list-header';
	sourceListHeader.classList.add("sub-panel");
	
	//sourceListHeader.style.backgroundColor = 'purple';
	sourceListHeader.textContent = 'source-list-container';
	//sourceListHeader.style.margin = '10px';
	sourceListHeader.style.display = 'flex';
	sourceListHeader.style.flexDirection = 'column';

	let fetchButton = document.createElement('button');
	fetchButton.id = 'source-list-fetch-button';
	fetchButton.innerHTML = 'Fetch Sources';
	sourceListHeader.appendChild(fetchButton);
	fetchButton.addEventListener('click', populateSourceList);

	let addButton = document.createElement('button');
	addButton.id = 'source-list-add-button';
	addButton.innerHTML = 'Add source';
	sourceListHeader.appendChild(addButton);
	addButton.addEventListener('click', addNewSource);

	document.getElementById('source-list-container').appendChild(sourceListHeader);


}

function addSourceList() {
	let sourceList = document.createElement('div');
	sourceList.id = 'source-list';
	sourceList.classList.add("sub-panel");

	//sourceList.style.backgroundColor = 'aqua';
	//sourceList.textContent = 'sl';
	//sourceList.style.margin = '10px';
	sourceList.style.flexGrow = '1';

	document.getElementById('source-list-container').appendChild(sourceList);


}

function addSourceListItem(sourceId) {
	let sourceListItem = document.createElement('div');
	sourceListItem.id = 'source-list-item';
	sourceListItem.style.backgroundColor = 'orange';
	sourceListItem.textContent = sourceId;
	sourceListItem.style.margin = '10px';
	sourceListItem.addEventListener('click', loadSourceViewerHeader);

	document.getElementById('source-list').appendChild(sourceListItem);



}

function addSourceViewerHeader() {
	let sourceViewerHeader = document.createElement('div');
	sourceViewerHeader.id = 'source-viewer-header';
	sourceViewerHeader.textContent = 'header';
	sourceViewerHeader.style.backgroundColor = 'orange';
	sourceViewerHeader.style.margin = '10px'
	sourceViewerHeader.style.height = '100px';
	sourceViewerHeader.style.whiteSpace = 'preWrap';
	sourceViewerHeader.style.display = 'flex';
	sourceViewerHeader.style.flexDirection = 'column';
	sourceViewerHeader.style.justifyContent = 'spaceEvenly';

	sourceViewerHeader.appendChild(createSourceViewerHeaderField('source-viewer-id-label'));


	document.getElementById('source-viewer-container').appendChild(sourceViewerHeader);

}

function addSourceViewerMedia() {
	let sourceViewerMedia = document.createElement('div');
	sourceViewerMedia.id = 'source-viewer-header';
	sourceViewerMedia.textContent = 'media';
	sourceViewerMedia.style.backgroundColor = 'aliceblue';
	sourceViewerMedia.style.margin = '10px'
	sourceViewerMedia.style.height = '100px';
	sourceViewerMedia.style.whiteSpace = 'preWrap';
	sourceViewerMedia.style.flexGrow = '1';


	document.getElementById('source-viewer-container').appendChild(sourceViewerMedia);

}
 */



/*  

NEW BELOW 2023-12-03

*/


 /*
	SOURCEFIND PANEL
 */

function createSourcefindSearchcard(){
	let sourcefindSearchcard = document.createElement('div');
	sourcefindSearchcard.id = 'sourcefind-searchcard';
	sourcefindSearchcard.classList.add('card', 'sourcefind-searchcard');
	//sourcefindSearchcard.textContent = 'cardcard';

	let sourcefindSearchbar = Elements.getSosInput('sourcefind-searchbar', 'Source Search', 'type to search for source');
	sourcefindSearchbar.style.gridColumn = '1 / span 4'
	sourcefindSearchcard.appendChild(sourcefindSearchbar);

	let sourcefindFetch = Elements.getSosButton('sourcefind-fetch');
	sourcefindFetch.addEventListener('click', fetchSourcesClicked);
	sourcefindSearchcard.appendChild(sourcefindFetch);

	let sourcefindAdd = Elements.getSosButton('sourcefind-add');
	sourcefindAdd.addEventListener('click', addSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindAdd);

	let sourcefindDelete = Elements.getSosButton('sourcefind-delete');
	sourcefindDelete.addEventListener('click', deleteSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindDelete);
	

	return sourcefindSearchcard;
}

function createSourcefindListcard(){
	let sourcefindList = document.createElement('div');
	sourcefindList.id = 'sourcefind-listcard';
	sourcefindList.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	

	return sourcefindList;
}


function createSourcefindSourcecard(fetchedSource){
	let sourcefindListcard = document.getElementById('sourcefind-listcard');

	let sourcefindSourcecard = document.createElement('div');
	sourcefindSourcecard.id = 'sourcefind-sourcecard-' + fetchedSource.id;
	sourcefindSourcecard.classList.add('sourcefind-sourcecard');
	sourcefindSourcecard.addEventListener('click', sourceCardClicked);
	

	//sourcefindSourcecard.textContent = 'sourcefind-sourcecard-' + fetchedSource.id;
	
	//let sourcefindName = createReadElement('sourcefind-name-' + fetchedSource.id, 'source name:', fetchedSource.name);
	let sourcefindName = Elements.getSosLabel('sourcefind-title-' + fetchedSource.id, fetchedSource.title);
	sourcefindName.classList.add('sourcefind-title', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindName);

	let sourcefindId = Elements.getSosLabel('sourcefind-id-' + fetchedSource.id, fetchedSource.id);
	sourcefindId.classList.add('sourcefind-id', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindId);

	let sourcefindDate = Elements.getSosLabel('sourcefind-datecreated-' + fetchedSource.id, fetchedSource.dateCreated);
	sourcefindDate.classList.add('sourcefind-datecreated', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindDate);


	sourcefindListcard.appendChild(sourcefindSourcecard);

	return sourcefindSourcecard;
}





/*
   SOURCEVIEW PANEL
*/

function createSourceviewPropertiescard() {
	// outer and inner div to enable collapsing by user
	let sourceviewPropertiescardOuter = document.createElement('div');
	sourceviewPropertiescardOuter.id = 'sourceview-propertiescard-outer';
	sourceviewPropertiescardOuter.classList.add('card');
	//sourceviewPropertiescardOuter.textContent = 'sourceview-propertiescard-outer';

	let sourceviewPropertiescardInner = document.createElement('div');
	sourceviewPropertiescardInner.id = 'sourceview-propertiescard-inner';
	sourceviewPropertiescardInner.classList.add('card');
	//sourceviewPropertiescardInner.textContent = 'sourceview-propertiescard-inner';

	sourceviewPropertiescardOuter.appendChild(sourceviewPropertiescardInner);

	let sourceviewName = Elements.getSosInput('sourceview-title', 'Title', '');
	sourceviewName.classList.add('sourceview-element');
	sourceviewName.addEventListener('focusout', sourceviewFieldFocusout);
	sourceviewPropertiescardInner.appendChild(sourceviewName);

	let sourceviewUrl = Elements.getSosInput('sourceview-url', 'URL', '');
	sourceviewUrl.classList.add('sourceview-element');
	sourceviewUrl.addEventListener('focusout', sourceviewFieldFocusout);
	sourceviewPropertiescardInner.appendChild(sourceviewUrl);

	let sourceviewId = Elements.getSosDisabledInput('sourceview-id', 'ID', '');
	sourceviewId.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewId);

	let sourceviewDate = Elements.getSosDisabledInput('sourceview-datecreated', 'Date Created:', '');
	sourceviewDate.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewDate);

	let sourceviewHasFile = Elements.getSosDisabledInput('sourceview-hasfile', 'Has File:', '');
	sourceviewHasFile.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewHasFile);

	let sourceviewFileType = Elements.getSosDisabledInput('sourceview-filetype', 'File Type:', '');
	sourceviewFileType.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileType);

	let sourceviewFileEnding = Elements.getSosDisabledInput('sourceview-fileending', 'File Ending:', '');
	sourceviewFileEnding.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileEnding);

	let sourceviewReviewDates = Elements.getDateViewer('sourceview-reviewdates');
	sourceviewReviewDates.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewReviewDates);

	let sourceviewButtonCard = getSourceviewButtonCard();
	sourceviewButtonCard.id = 'sourceview-button-card';
	//sourceviewButtonCard.addEventListener('click', deleteSourceClicked);
	sourceviewPropertiescardInner.appendChild(sourceviewButtonCard);





	return sourceviewPropertiescardOuter;
}

function getSourceviewViewcard(){
	let sourceviewViewcard = document.createElement('div');
	sourceviewViewcard.id = 'sourceview-viewcard';
	sourceviewViewcard.classList.add('card');

	return sourceviewViewcard;
}


/* PRIVATE */
function getSourceviewButtonCard(){
	let buttonCard = document.createElement('div');
	//buttonCard.classList.add('button-card');

	let sourceviewLoad = Elements.getSosButton('load');
	sourceviewLoad.id = 'sourceview-load';
	sourceviewLoad.addEventListener('click', loadSourceFilePressed);
	buttonCard.appendChild(sourceviewLoad);


	// Set costum label for file selector
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
	let sourceviewUpload = document.createElement('input');
	sourceviewUpload.id = 'sourceview-upload';
	sourceviewUpload.type = 'file';
	sourceviewUpload.addEventListener('change', uploadSourceFilePressed);
	let sourceviewUploadLabel = document.createElement('label');
	sourceviewUploadLabel.id = 'sourceview-upload-label';
	// https://stackoverflow.com/questions/15750290/setting-the-html-label-for-attribute-in-javascript
	sourceviewUploadLabel.htmlFor = 'sourceview-upload';
	sourceviewUploadLabel.textContent = 'upload';
	
	buttonCard.appendChild(sourceviewUpload);
	buttonCard.appendChild(sourceviewUploadLabel);

	

	return buttonCard;
}


export {
	// addSourceListHeader,
	// addSourceList,
	// addSourceListItem,
	// addSourceViewerHeader,
	// addSourceViewerMedia,

	createSourcefindSearchcard,
	createSourcefindListcard,
	createSourcefindSourcecard,
	createSourceviewPropertiescard,
	getSourceviewViewcard
}
