function createToast() {
	// Get the toast element
	//var toast = document.getElementById('toast');
	let toast = document.createElement('div');
	toast.id = 'toast';
	toast.innerHTML = 'toastytoastytoastytoastytoastytoastytoastytoasty';

	let toastStyle = document.createElement('style');
	toastStyle.innerHTML = `
  	:root {
    	--toasth: 50px;
  		--toastw: 200px;
		}

		#toast {
			background-color: orange;
      		display: none;
      		position: absolute;
      		height: var(--toasth);
      		width: var(--toastw);
			top: calc( 100vh - var(--toasth) - 10px );
      		left: calc( 100vw - var(--toastw) - 10px );
      		white-space: nowrap;
      		overflow-x: hidden;
			
		}

	`;

	document.body.appendChild(toast);
	document.body.appendChild(toastStyle);

	
}


function showToast(toastString) {

	let toast = document.getElementById('toast');
	toast.textContent = toastString;
	toast.style.display = 'inline';

	// Hide the toast after 1 second
	setTimeout(function () {
		toast.style.display = 'none';
	}, 5000);

}

export {
	createToast,
	showToast
}