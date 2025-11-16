console.clear();
console.log("index.js loaded");

// Ensure DOM is ready before binding menu handlers — fixes issue where script loaded in <head>
document.addEventListener('DOMContentLoaded', () => {
	// 下拉菜单交互：点击切换、点击外部关闭、Esc 关闭
	const menuButtons = Array.from(document.querySelectorAll('.menu-button'));

	function closeAll() {
		menuButtons.forEach(li => {
			const btn = li.querySelector('.menu-button-f');
			const panel = li.querySelector('.menu-botton-down-c');
			li.classList.remove('open');
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

	// 绑定按钮点击与键盘
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

	// 初始化 aria 状态
	menuButtons.forEach(li => {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		if (btn) btn.setAttribute('aria-expanded', 'false');
		if (panel) panel.setAttribute('aria-hidden', 'true');
	});
});