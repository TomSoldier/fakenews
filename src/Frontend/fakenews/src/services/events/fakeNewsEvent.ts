import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';

export enum FakeNewsEventType {
	RegistrationSuccess,
}

export interface FakeNewsEvent {
	readonly id: string;
	readonly type: FakeNewsEventType;
	readonly message?: string;
}

let eventId = 0;
export function createEvent(
	type: FakeNewsEventType,
	message?: string
): FakeNewsEvent {
	const event = { type, id: eventId.toString(), message };
	eventId += 1;
	return event;
}

export function mapEventsToToasts(events: FakeNewsEvent[]): Toast[] {
	return events.map((e) => {
		switch (e.type) {
			case FakeNewsEventType.RegistrationSuccess:
				return {
					id: e.id,
					title: 'Registration successful.',
					color: 'success',
					iconType: 'check',
					text: "We'll redirect you to the login page.",
				};
			default:
				return {
					id: e.id,
					title: 'Ooops',
					color: 'danger',
					iconType: 'alert',
					text: 'Something went wrong.',
				};
		}
	});
}
