export class HashService {
	lastOffset = 0;
	previous = [];
	chunkSize = 1024 * 1024; // bytes
	timeout = 10; // millisec
	chunkReorder = 0;
	chunkTotal = 0;

// memory reordering
	clear() {
		this.lastOffset = 0;
		this.chunkReorder = 0;
		this.chunkTotal = 0;
	}

	loading(file, callbackProgress, callbackFinal) {
		let offset = 0;
		const size = this.chunkSize;
		let partial;
		let index = 0;

		if (file.size === 0) {
			callbackFinal();
		}
		while (offset < file.size) {
			partial = file.slice(offset, offset + size);
			const reader: any = new FileReader;
			reader.size = size;
			reader.offset = offset;
			reader.index = index;
			reader.onload = (evt) => {
				this.callbackRead(reader, file, evt, callbackProgress, callbackFinal);
			};
			reader.readAsArrayBuffer(partial);
			offset += size;
			index += 1;
		}
	}

	callbackRead(obj, file, evt, callbackProgress, callbackFinal) {
		this.callbackRead_buffered(obj, file, evt, callbackProgress, callbackFinal);
	}

// time reordering
	callbackRead_waiting(reader, file, evt, callbackProgress, callbackFinal) {
		if (this.lastOffset === reader.offset) {
			console.log('[', reader.size, ']', reader.offset, '->', reader.offset + reader.size, '');
			this.lastOffset = reader.offset + reader.size;
			callbackProgress(evt.target.result);
			if (reader.offset + reader.size >= file.size) {
				this.lastOffset = 0;
				callbackFinal();
			}
			this.chunkTotal++;
		} else {
			console.log('[', reader.size, ']', reader.offset, '->', reader.offset + reader.size, 'wait');
			setTimeout(() => {
				this.callbackRead_waiting(reader, file, evt, callbackProgress, callbackFinal);
			}, this.timeout);
			this.chunkReorder++;
		}
	}

	callbackRead_buffered(reader, file, evt, callbackProgress, callbackFinal) {
		this.chunkTotal++;

		if (this.lastOffset !== reader.offset) {
			// out of order
			console.log('[', reader.size, ']', reader.offset, '->', reader.offset + reader.size, '>>buffer');
			this.previous.push({offset: reader.offset, size: reader.size, result: reader.result});
			this.chunkReorder++;
			return;
		}

		const parseResult = (offset, size, result) => {
			this.lastOffset = offset + size;
			callbackProgress(result);
			if (offset + size >= file.size) {
				this.lastOffset = 0;
				callbackFinal();
			}
		};

		// in order
		console.log('[', reader.size, ']', reader.offset, '->', reader.offset + reader.size, '');
		parseResult(reader.offset, reader.size, reader.result);

		// resolve previous buffered
		let buffered: any = [{}];
		while (buffered.length > 0) {
			buffered = this.previous.filter((item) => {
				return item.offset === this.lastOffset;
			});
			buffered.forEach((item) => {
				console.log('[', item.size, ']', item.offset, '->', item.offset + item.size, '<<buffer');
				parseResult(item.offset, item.size, item.result);
				this.remove(this.previous, item);
			})
		}

	}

	remove(arr, val) {
		let i = arr.length;
		while (i--) {
			if (arr[i] === val) {
				arr.splice(i, 1);
			}
		}
	};
}
