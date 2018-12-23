; (function (window) {
	// var list = JSON.parse(localStorage.getItem('item')) || [];
	var vm = new Vue({
		el: '#app',
		data: {
			name: '',
			editId: -1,
			list: []
		},
		created() {
			this.list = JSON.parse(localStorage.getItem('item')) || [];
			axios
				.get(' http://localhost:3000/list')
				.then(function (res) {
				this.list=res.data;
				})
		},
		methods: {
			add() {
				if (this.name.length === 0) {
					this.name = ''
					return
				}
				this.list.push({ id: this.list[this.list.length - 1] + 1, name: this.name, done: false })
				this.name = ''

			},
			del(id) {
				this.list.splice(this.list.findIndex(item => item.id == id), 1)
			},
			clear() {
				this.list = this.list.filter(v => v.done === false)
			}
		},
		computed: {
			num() {
				return this.list.filter(item => item.done == false).length
			},
			complated() {
				return this.list.some(v => v.done == true)
			},
			have() {
				return this.list.length
			}

		},
		watch: {
			list: {
				deep: true,
				handler(vle) {
					localStorage.setItem('item', JSON.stringify(vle));
				}
			}
		}

	})



	window.vm = vm
})(window);