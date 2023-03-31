import {type Observable, type UnaryFunction, map, pipe, filter} from 'rxjs';

type Message = {
	data: Uint8Array;
};

type CommandResponse = {
	commandId: number;
	responseCode: string;
	data: Uint8Array;
};

function parseCommandResponseCode(responseCode: number) {
	switch (responseCode) {
		case 0:
			return 'success';
		case 1:
			return 'error';
		case 2:
			return 'invalidParameter';
		default:
			return 'unknown';
	}
}

function convertMessageToCommand(message: Message) {
	const commandId = message.data[0];
	if (commandId === undefined) {
		console.error(
			'[parseMessageToCommand] received invalid commandId',
			message,
		);
		return;
	}

	const responseId = message.data[1];
	if (responseId === undefined) {
		console.error(
			'[parseMessageToCommand] received invalid responseId',
			message,
		);
		return;
	}

	const responseCode = parseCommandResponseCode(responseId);
	const commandData = message.data.subarray(2);

	return {
		commandId,
		responseCode,
		data: commandData,
	};
}

export function parseMessageToCommandResponse(): UnaryFunction<
	Observable<Message>,
	Observable<CommandResponse>
> {
	return pipe(
		map((x) => convertMessageToCommand(x)),
		filter((x): x is NonNullable<typeof x> => Boolean(x)),
	);
}
