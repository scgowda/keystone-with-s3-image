'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _elemental = require('elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	shouldCollapse: function shouldCollapse() {
		return this.props.collapse && !this.hasExisting();
	},
	fileFieldNode: function fileFieldNode() {
		return _reactDom2.default.findDOMNode(this.refs.fileField);
	},
	changeFile: function changeFile() {
		this.fileFieldNode().click();
	},
	getFileSource: function getFileSource() {
		if (this.hasLocal()) {
			return this.state.localSource;
		} else if (this.hasExisting()) {
			return this.props.value.url;
		} else {
			return null;
		}
	},
	getFileURL: function getFileURL() {
		if (!this.hasLocal() && this.hasExisting()) {
			return this.props.value.url;
		}
	},
	undoRemove: function undoRemove() {
		this.fileFieldNode().value = '';
		this.setState({
			removeExisting: false,
			localSource: null,
			origin: false,
			action: null
		});
	},
	fileChanged: function fileChanged(event) {
		// eslint-disable-line no-unused-vars
		this.setState({
			origin: 'local'
		});
	},
	removeFile: function removeFile(e) {
		var state = {
			localSource: null,
			origin: false
		};

		if (this.hasLocal()) {
			this.fileFieldNode().value = '';
		} else if (this.hasExisting()) {
			state.removeExisting = true;

			if (this.props.autoCleanup) {
				if (e.altKey) {
					state.action = 'reset';
				} else {
					state.action = 'delete';
				}
			} else {
				if (e.altKey) {
					state.action = 'delete';
				} else {
					state.action = 'reset';
				}
			}
		}

		this.setState(state);
	},
	hasLocal: function hasLocal() {
		return this.state.origin === 'local';
	},
	hasFile: function hasFile() {
		return this.hasExisting() || this.hasLocal();
	},
	hasExisting: function hasExisting() {
		return !!this.props.value.filename;
	},
	getFilename: function getFilename() {
		if (this.hasLocal()) {
			return this.fileFieldNode().value.split('\\').pop();
		} else {
			return this.props.value.filename;
		}
	},
	getAltText: function getAltText() {
		return this.props.value.alt;
	},
	renderFileDetails: function renderFileDetails(add) {
		var values = null;

		if (this.hasFile() && !this.state.removeExisting) {
			values = _react2.default.createElement(
				'div',
				{ className: 'file-values' },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					this.getFilename()
				)
			);
		}

		return _react2.default.createElement(
			'div',
			{ key: this.props.path + '_details', className: 'file-details' },
			values,
			add
		);
	},
	altValueChanged: function altValueChanged(event) {
		this.props.value.alt = event.target.value;
	},
	renderAltInput: function renderAltInput() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement('input', { type: 'text', className: 'FormInput item-name-field', placeholder: 'Alt text', defaultValue: this.getAltText(), onChange: this.altValueChanged, autocomplete: 'off', name: this.props.paths.alt });
	},
	renderAlert: function renderAlert() {
		if (this.hasLocal()) {
			return _react2.default.createElement(
				'div',
				{ className: 'file-values upload-queued' },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					'File selected - save to upload'
				)
			);
		} else if (this.state.origin === 'cloudinary') {
			return _react2.default.createElement(
				'div',
				{ className: 'file-values select-queued' },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					'File selected from Cloudinary'
				)
			);
		} else if (this.state.removeExisting) {
			return _react2.default.createElement(
				'div',
				{ className: 'file-values delete-queued' },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					'File ',
					this.props.autoCleanup ? 'deleted' : 'removed',
					' - save to confirm'
				)
			);
		} else {
			return null;
		}
	},
	renderClearButton: function renderClearButton() {
		if (this.state.removeExisting) {
			return _react2.default.createElement(
				_elemental.Button,
				{ type: 'link', onClick: this.undoRemove },
				'Undo Remove'
			);
		} else {
			var clearText;
			if (this.hasLocal()) {
				clearText = 'Cancel Upload';
			} else {
				clearText = this.props.autoCleanup ? 'Delete File' : 'Remove File';
			}
			return _react2.default.createElement(
				_elemental.Button,
				{ type: 'link-cancel', onClick: this.removeFile },
				clearText
			);
		}
	},
	renderFileField: function renderFileField() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement('input', { ref: 'fileField', type: 'file', name: this.props.paths.upload, className: 'field-upload', onChange: this.fileChanged, tabIndex: '-1' });
	},
	renderFileAction: function renderFileAction() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement('input', { type: 'hidden', name: this.props.paths.action, className: 'field-action', value: this.state.action });
	},
	renderFileToolbar: function renderFileToolbar() {
		return _react2.default.createElement(
			'div',
			{ key: this.props.path + '_toolbar', className: 'file-toolbar' },
			_react2.default.createElement(
				'div',
				{ className: 'u-float-left' },
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.changeFile },
					this.hasFile() ? 'Change' : 'Upload',
					' File'
				),
				this.hasFile() && this.renderClearButton()
			)
		);
	},
	renderNote: function renderNote() {
		if (!this.props.note) return null;

		return _react2.default.createElement(_elemental.FormNote, { note: this.props.note });
	},
	renderThumbnail: function renderThumbnail() {
		var _this = this;

		if (this.hasFile()) {
			if (this.hasLocal() && this.old_image !== this.fileFieldNode().files[0]) {
				var imgReader = new FileReader();
				imgReader.onload = function (e) {
					_this.setState({ imgfilesrc: e.target.result });
				};

				imgReader.readAsDataURL(this.fileFieldNode().files[0]);
				this.old_image = this.fileFieldNode().files[0];
			} else if (this.getFileSource() && !this.state.imgfilesrc) {
				this.setState({ imgfilesrc: this.getFileSource() });
			}
		} else {
			return null;
		}
	},
	renderUI: function renderUI() {
		var container = [];
		var body = [];
		var control = [];
		var hasFile = this.hasFile();

		if (this.shouldRenderField()) {
			if (hasFile) {
				this.renderThumbnail();
				container.push(this.renderFileDetails(this.renderAlert()));
				container.push(this.renderAltInput());
				body.push(_react2.default.createElement('img', { src: this.state.imgfilesrc, alt: '', height: '90', style: { maxWidth: '150px!important', paddingRight: '20px', marginBottom: '1em' } }));
			}
			control.push(this.renderFileToolbar());
		} else {
			if (hasFile) {
				container.push(this.renderFileDetails());
			} else {
				container.push(_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					'no file'
				));
			}
		}

		return _react2.default.createElement(
			_elemental.FormField,
			{ label: this.props.label, className: 'field-type-localfile', htmlFor: this.props.path },
			this.renderFileField(),
			this.renderFileAction(),
			_react2.default.createElement(
				'div',
				{ style: { display: 'inline-block', float: 'left' } },
				body
			),
			_react2.default.createElement(
				'div',
				{ style: { width: '73%', float: 'left' } },
				_react2.default.createElement(
					'div',
					{ className: 'file-container' },
					container
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'clear' },
				control
			),
			this.renderNote()
		);
	}
});