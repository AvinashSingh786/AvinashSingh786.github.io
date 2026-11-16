(function () {
	var header = document.getElementById('header');
	var pattern = header && header.querySelector('.pointer-pattern');
	var page = document.body;
	var supportsPointerTracking = typeof window.matchMedia === 'function' && window.matchMedia(
		'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
	).matches;

	if (!page || !supportsPointerTracking || typeof window.requestAnimationFrame !== 'function') {
		return;
	}

	var pendingPointer;
	var animationFrame = null;

	document.addEventListener('pointermove', function (event) {
		if (event.pointerType === 'touch') {
			return;
		}

		pendingPointer = event;
		if (animationFrame !== null) {
			return;
		}

		animationFrame = window.requestAnimationFrame(function () {
			var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
			var viewportHeight = document.documentElement.clientHeight || window.innerHeight;
			if (viewportWidth && viewportHeight) {
				var x = (pendingPointer.clientX / viewportWidth) * 100;
				var y = (pendingPointer.clientY / viewportHeight) * 100;

				page.style.setProperty('--pointer-x', Math.max(0, Math.min(100, x)).toFixed(2) + '%');
				page.style.setProperty('--pointer-y', Math.max(0, Math.min(100, y)).toFixed(2) + '%');
			}

			if (pattern && header.contains(pendingPointer.target)) {
				var bounds = header.getBoundingClientRect();
				if (bounds.width && bounds.height) {
					var headerX = ((pendingPointer.clientX - bounds.left) / bounds.width) * 100;
					var headerY = ((pendingPointer.clientY - bounds.top) / bounds.height) * 100;

					pattern.style.setProperty('--pointer-x', Math.max(0, Math.min(100, headerX)).toFixed(2) + '%');
					pattern.style.setProperty('--pointer-y', Math.max(0, Math.min(100, headerY)).toFixed(2) + '%');
				}
			}

			animationFrame = null;
		});
	});
}());
