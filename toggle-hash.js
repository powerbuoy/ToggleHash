(function (factory) {
	'use strict';

	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
})(function ($) {
	'use strict';

	$.fn.toggleHash = function (conf) {
		conf = conf || {};

		var config = {
			onAdd: conf.onAdd || function () {},
			onRemove: conf.onRemove || function () {}
		};

		return this.each(function () {
			var t = $(this);
			var tHash = t.attr('href');

			// Trigger callback on hash change (NOTE: Collides with other libs like smooth scroll...)
		/*	$(window).on('hashchange', function () {
				if (window.location.hash == tHash) {
					config.onAdd(tHash);
				}
				else {
					config.onRemove(tHash);
				}
			}); */

			// Toggle hash on click
			t.click(function (e) {
				e.preventDefault();

				var clicked = $(this);
				var clickedHash = clicked.attr('href');
				var currHash = window.location.hash;

				// We're currently on this hash - clear it
				if (clickedHash == currHash) {
					var st = $(document).scrollTop();

					window.location.hash = '#';

					$(document).scrollTop(st);

					if ('replaceState' in window.history) {
						window.history.replaceState('', document.title, window.location.pathname + window.location.search);
					}

					config.onRemove(clickedHash);
				}
				else {
					var st = $(document).scrollTop();

					window.location.hash = clickedHash;

					$(document).scrollTop(st);

					config.onAdd(clickedHash);
				}
			});
		});
	};
});
