const Util = {
	promiseComponse: function(promiseArray){},
	createHash: function(array, property) {
		return array.reduce((cur, next) => {
			cur[next[property]] = next;
			return cur;
		}, {});
	}
}

module.exports = exports = Util;