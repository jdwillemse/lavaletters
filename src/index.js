import anime from 'animejs'
import './index.css';

const svgNS = "http://www.w3.org/2000/svg";
const blobDefs = [
	"M76.735 36.152c-5 19.2-21.4 29.2-37.8 26.6-16.5-2.9-33.4-12.9-37.1-26.6-3.8-13.6 12.5-32.1 37.8-34.9 25.3-2.8 42.2 15.8 37.1 34.9z",
	"M55.795 17.513c-4.4 10.1-16.4 20.2-26.8 25.3-10.4 5.2-22.4-2.9-26.8-15.2-4.4-11.6 7.6-20.4 26.8-25.3 19.2-4.9 31.2 4.4 26.8 15.2z",
	"M1.872 17.384c2.7-7.1 9.4-15.7 15.4-16.4 5.9-.4 12.6 8.5 15.4 16.9 2.7 8.4-4.2 14.9-15.4 14.2-11.2-.9-18.1-7.6-15.4-14.7z",
	"M39.7 26.3c-2.1 16.4-15.3 27.2-23.2 25.3-8.1-1.8-12.6-13-14.8-24.9C-.2 14.9 4.4 4 16.5 1.4c12-2.8 25.2 8.4 23.2 24.9z",
	"M22.863 10.737c-1 8.2-9.8 10.3-13.8 9.3-4-.9-6.5-3-7.6-8.9-1-5.9 2.3-8.5 8.4-9.8 6-1.4 14 1.1 13 9.4z",
	"M24.746 4.179c12.846 3.912 9.252 17.832 9.612 24.51.44 6.72-10.19 8.59-21.456 5.381C2.188 31.154-.53 22.232 2.372 11.788 5.274 1.343 17.77-2.253 24.746 4.178z",
	"M2.413 17.896C-1.39 9.617 5.315 2.827 9.483 1.584 13.596.246 17.047.86 21.419 5.822c4.283 5.017 2.807 9.273-1.93 13.833-4.59 4.6-13.214 6.615-17.075-1.759z",
	"M76.735 36.152c-5 19.2-21.4 29.2-37.8 26.6-16.5-2.9-33.4-12.9-37.1-26.6-3.8-13.6 12.5-32.1 37.8-34.9 25.3-2.8 42.2 15.8 37.1 34.9z",
	"M55.795 17.513c-4.4 10.1-16.4 20.2-26.8 25.3-10.4 5.2-22.4-2.9-26.8-15.2-4.4-11.6 7.6-20.4 26.8-25.3 19.2-4.9 31.2 4.4 26.8 15.2z",
	"M1.872 17.384c2.7-7.1 9.4-15.7 15.4-16.4 5.9-.4 12.6 8.5 15.4 16.9 2.7 8.4-4.2 14.9-15.4 14.2-11.2-.9-18.1-7.6-15.4-14.7z",
	"M39.7 26.3c-2.1 16.4-15.3 27.2-23.2 25.3-8.1-1.8-12.6-13-14.8-24.9C-.2 14.9 4.4 4 16.5 1.4c12-2.8 25.2 8.4 23.2 24.9z",
	"M22.863 10.737c-1 8.2-9.8 10.3-13.8 9.3-4-.9-6.5-3-7.6-8.9-1-5.9 2.3-8.5 8.4-9.8 6-1.4 14 1.1 13 9.4z",
	"M24.746 4.179c12.846 3.912 9.252 17.832 9.612 24.51.44 6.72-10.19 8.59-21.456 5.381C2.188 31.154-.53 22.232 2.372 11.788 5.274 1.343 17.77-2.253 24.746 4.178z",
	"M2.413 17.896C-1.39 9.617 5.315 2.827 9.483 1.584 13.596.246 17.047.86 21.419 5.822c4.283 5.017 2.807 9.273-1.93 13.833-4.59 4.6-13.214 6.615-17.075-1.759z"
];
	const svgParent = document.querySelector("#generated");
	const canvasWidth = svgParent.clientWidth - 50;
	const canvasHeight = svgParent.clientHeight;
	const letterHeight = 450;

const randomBetween = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

const createPath = (shape, i) => {
	const path = document.createElementNS(svgNS, "path");
	path.setAttributeNS(null, "d", shape);
	path.setAttributeNS(null, "class", `blob blob${i}`);
	return path;
}

const createOuterGroup = (i) => {
	const group = document.createElementNS(svgNS, "g");
	group.setAttributeNS(null, "class", `blob-group group${i}`);
	group.setAttributeNS(null, "filter", "url(#blur)");
	return group;
}

const createInnerGroup = () => {
	const group = document.createElementNS(svgNS, "g");
	group.setAttributeNS(null, "clip-path", "url(#letter)");
	return group;
}

const tl = anime.timeline({
  duration: 5000,
  complete: function() { tl.restart(); }
});


// create groups
for (let i = 1; i <= 5; i++) {
	const outerGroup = createOuterGroup(i);
	const innerGroup = createInnerGroup();

	// control number of blobs
	for (let k = 0; k < 7; k++) {
		// create blobs
		blobDefs.forEach((shape, j) => {
			const path = createPath(shape, j);
			const animDuration = randomBetween(10000, 30000);
			const offset = randomBetween(0, 20000);
			let scale = 1;

			if (j > 12) {
				scale = [{ value: 0, duration: 0 },{
					value: 1,
					duration: 600,
					easing: 'easeOutBack'
				}, {
					value: 0,
					duration: 600,
					easing: 'easeInBack',
					delay: animDuration - randomBetween(600, 3000)
				}];

				outerGroup.append(path);
			} else {

				innerGroup.append(path);
			}

			tl.add(anime({
			  targets: path,
			  translateX: [{ value: randomBetween(0, canvasWidth - 20), duration: 0 }],
			  translateY: j <= 12
			  	? [
						  { value: canvasHeight, duration: 0 },
						  { value: canvasHeight - letterHeight, duration: animDuration }
					  ]
				  : [
						  { value: canvasHeight - 20, duration: 0 },
						  { value: randomBetween(0, 100), duration: animDuration }
					  ],
			  scale,
				easing: 'linear',
			  loop: true,
			  offset
			}));


		});
	}

	outerGroup.append(innerGroup);
	svgParent.append(outerGroup);
}
