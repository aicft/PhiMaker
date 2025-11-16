console.clear();
console.log("index.js loaded");

// 下拉菜单交互：点击切换、点击外部关闭、Esc 关闭
(function () {
	const menuButtons = Array.from(document.querySelectorAll('.menu-button'));

	function closeAll() {
		menuButtons.forEach(li => {
			const btn = li.querySelector('.menu-button-f');
			const panel = li.querySelector('.menu-botton-down-c');
			if (li.classList.contains('open')) {
				li.classList.remove('open');
			}
			if (btn) btn.setAttribute('aria-expanded', 'false');
			if (panel) panel.setAttribute('aria-hidden', 'true');
		});
	}

	// 切换单个菜单
	function toggleMenu(li) {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		const isOpen = li.classList.toggle('open');
		if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		if (panel) panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
		// 关闭其他
		menuButtons.forEach(other => {
			if (other !== li) {
				other.classList.remove('open');
				const obtn = other.querySelector('.menu-button-f');
				const opanel = other.querySelector('.menu-botton-down-c');
				if (obtn) obtn.setAttribute('aria-expanded', 'false');
				if (opanel) opanel.setAttribute('aria-hidden', 'true');
			}
		});
	}

	// 绑定按钮点击
	menuButtons.forEach(li => {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		if (!btn) return;

		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (panel) {
				toggleMenu(li);
			}
		});

		// 允许使用键盘打开（Enter / Space）
		btn.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (panel) toggleMenu(li);
			}
		});
	});

	// 点击外部关闭
	document.addEventListener('click', (e) => {
		// 如果点击的不是任何一个下拉面板或触发按钮，则关闭所有
		if (!e.target.closest('.menu-button')) {
			closeAll();
		}
	});

	// Esc 关闭
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' || e.key === 'Esc') {
			closeAll();
		}
	});

	// 当页面加载时，确保 aria 状态同步
	window.addEventListener('load', () => {
		menuButtons.forEach(li => {
			const btn = li.querySelector('.menu-button-f');
			const panel = li.querySelector('.menu-botton-down-c');
			if (btn) btn.setAttribute('aria-expanded', 'false');
			if (panel) panel.setAttribute('aria-hidden', 'true');
		});
	});
})();