console.clear();
console.log("index.js loaded");

// 入口：在 DOMContentLoaded 后绑定菜单交互逻辑，保证元素存在
document.addEventListener('DOMContentLoaded', () => {
	// 收集所有顶级菜单的 <li.menu-button>
	const menuButtons = Array.from(document.querySelectorAll('.menu-button'));

	// closeAll: 关闭所有已打开的下拉面板，并同步 aria 状态
	function closeAll() {
		menuButtons.forEach(li => {
			const btn = li.querySelector('.menu-button-f');
			const panel = li.querySelector('.menu-botton-down-c');
			li.classList.remove('open');
			if (btn) btn.setAttribute('aria-expanded', 'false');
			if (panel) panel.setAttribute('aria-hidden', 'true');
		});
	}

	// toggleMenu: 切换指定菜单的打开/关闭状态（并关闭其他菜单）
	function toggleMenu(li) {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		const isOpen = li.classList.toggle('open');
		// 同步可访问性状态到触发按钮和面板
		if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		if (panel) panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

		// 关闭其它菜单，保证一次只能打开一个
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

	// 绑定事件：点击切换、键盘（Enter/Space）触发
	menuButtons.forEach(li => {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		if (!btn) return; // 有些 li 可能只是占位（logo）

		// 点击触发下拉
		btn.addEventListener('click', (e) => {
			e.stopPropagation(); // 阻止冒泡，避免 document click 立即关闭
			if (panel) {
				toggleMenu(li);
			}
		});

		// 键盘打开（提高可访问性）
		btn.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (panel) toggleMenu(li);
			}
		});
	});

	// 点击页面空白处关闭所有下拉
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.menu-button')) {
			closeAll();
		}
	});

	// Esc 键关闭
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' || e.key === 'Esc') {
			closeAll();
		}
	});

	// 页面初始化：确保 aria-* 状态一致
	menuButtons.forEach(li => {
		const btn = li.querySelector('.menu-button-f');
		const panel = li.querySelector('.menu-botton-down-c');
		if (btn) btn.setAttribute('aria-expanded', 'false');
		if (panel) panel.setAttribute('aria-hidden', 'true');
	});
});