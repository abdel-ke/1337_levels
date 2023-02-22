import { checkToken, generateToken } from './auth.mjs'
import { doIt } from './data.mjs'
import { countDays, printName, color, profile } from './profile.mjs'

export const main = async (pos) => {
	try {
		const token = localStorage.getItem("token");
		const tokenInfo = await checkToken(token);
		if (!tokenInfo.expires_in_seconds || tokenInfo.expires_in_seconds < 60) {
			try {
				const newToken = await generateToken(token);
				localStorage.setItem("token", newToken);
				doIt(pos);
			} catch (err) {
				console.log("generate token error 1", err);
			}
		} else {
			try {
				doIt(pos);
			} catch (err) {
				console.log("generate token error 2", err);
			}
		}
	} catch (err) {
		console.log(err);
	}
};

export const selectMED = () => {
	document.getElementById("BG").value = 0;
	document.getElementById("KH").value = 0;
	let x = document.getElementById("MED").value;
	switch (x) {
		case '1':
			main(9); break;
		default:
			console.log("default", x); break;
	}
};

export const selectKH = () => {
	document.getElementById("BG").value = 0;
	document.getElementById("MED").value = 0;
	let x = document.getElementById("KH").value;
	switch (x) {
		case '1':
			main(1); break;
		case '2':
			main(2); break;
		case '3':
			main(3); break;
		case '4':
			main(4); break;
		case '5':
			main(7); break;
		default:
			console.log("default", x); break;
	}
};

export const selectBG = () =>{
	document.getElementById("KH").value = 0;
	document.getElementById("MED").value = 0;
	let x = document.getElementById("BG").value;
	switch (x) {
		case '1':
			main(5); break;
		case '2':
			main(6); break;
		case '3':
			main(8); break;
		default:
			console.log("default", x); break;
	}
};

export const loadProducts =(users) =>{
	let htmlString = "";
	let cp = 0;
	if (users)
	users.forEach((elm) => {
		const currentDate = moment();
		const blackHoleDate = moment(elm.blackholed_at);
		const diffr = blackHoleDate.diff(currentDate, "days");
		htmlString +=
			`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
			<div class="image-flip" >
				<div class="mainflip flip-0">
					<div class="frontside">
						<div class="card">
							<div class="card-body text-center">
								<div style="width: 120px;height: 120px;margin-left: auto;margin-right: auto;">
									<img class=" img-fluid" src="${elm.user.image.link}" alt="card image" style=" width: 100%; object-fit: cover;">
								</div>
								<h5 class="card-text">${printName(elm)}</h5>
								<h4 class="${color(elm, diffr)}">${countDays(elm, diffr)}</h4>
									<a href="https://profile.intra.42.fr/users/${elm.user.login}" target="_blank" class="btn btn-primary btn-sm">
									${profile(elm)}
									</a>
									<h5 style="margin-top: 10px; margin-bottom: 0px;">${++cp}</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	});
	document.getElementById("home_product").innerHTML = htmlString;
}

window.loadProducts = loadProducts();
document.querySelector("#KH").addEventListener("change", () => selectKH());
document.querySelector("#BG").addEventListener("change", () => selectBG());
document.querySelector("#MED").addEventListener("change", () => selectMED());