"use strict";

var React = require('react');

var S3ImageColumn = React.createClass({
	displayName: "S3ImageColumn",

	render: function render() {
		var value = this.props.data.fields[this.props.col.path];
		var isVal = value.url ? value.url : null;
		return React.createElement(
			"td",
			{ className: "ItemList__col" },
			React.createElement(
				"div",
				{ className: "ItemList__value ItemList__value--s3-file" },
				React.createElement(
					"a",
					{ href: isVal, target: "_blank" },
					isVal
				)
			)
		);
	}
});

module.exports = S3ImageColumn;