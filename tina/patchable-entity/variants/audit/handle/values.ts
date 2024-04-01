import type { Time } from '@/types/index';
import { FileQuery } from 'tina/__generated__/types';
import { readableDateFromDatetime } from '../../../../../utils/readables';
import type { AuditPlaceholder } from './placeholders';

export default (
  placeholder: AuditPlaceholder,
  entity: FileQuery['file']['entity']
): string | string[] => {
  const placeholderToValue: Record<AuditPlaceholder, any> = {
    field_client_name: entity?.certificant?.name,
    field_client_address: clientAddress(entity),
    field_client_addresses_audited: clientAddressAudited(entity),
    field_client_representative_name: clientRepresentativeName(entity),
    field_client_representative_email: clientRepresentativeEmail(entity),
    field_remote: remote(entity),
    field_audit_method: entity?.method,
    field_iso_1: fieldStandard(entity, 0),
    field_iso_1_isoType: fieldStandardType(entity, 0),
    field_iso_1_regNumber: fieldRegNumber(entity, 0),
    field_iso_2: fieldStandard(entity, 1),
    field_iso_2_isoType: fieldStandardType(entity, 1),
    field_iso_2_regNumber: fieldRegNumber(entity, 1),
    field_iso_3: fieldStandard(entity, 2),
    field_iso_3_isoType: fieldStandardType(entity, 2),
    field_iso_3_regNumber: fieldRegNumber(entity, 2),
    field_iso_4: fieldStandard(entity, 3),
    field_iso_4_isoType: fieldStandardType(entity, 3),
    field_iso_4_regNumber: fieldRegNumber(entity, 3),
    field_iso_5: fieldStandard(entity, 4),
    field_iso_5_isoType: fieldStandardType(entity, 4),
    field_iso_5_regNumber: fieldRegNumber(entity, 4),
    field_auditplan: auditplan(entity),
  };

  return placeholderToValue[placeholder];
};

const clientAddress = (entity: FileQuery['file']['entity']) =>
  entity?.certificant?.locations?.find((item) => item?.isPrimaryLocation)
    ?.location;

const clientAddressAudited = (entity: FileQuery['file']['entity']) =>
  Array.from(new Set(entity?.dates?.map((date) => date?.location)));

const clientRepresentative = (entity: FileQuery['file']['entity']) =>
  entity?.partners?.find((item) => item?.isRepresentative)?.person;

const clientRepresentativeName = (entity: FileQuery['file']['entity']) => {
  const representative = clientRepresentative(entity);

  if (representative) {
    return `${representative.firstName} ${representative.lastName}`;
  }
  return undefined;
};

const clientRepresentativeEmail = (entity: FileQuery['file']['entity']) => {
  const representative = clientRepresentative(entity);

  if (representative) {
    return `${representative.email}`;
  }
  return undefined;
};

const remote = (entity: FileQuery['file']['entity']) =>
  entity?.dates?.every((item) => item?.isRemote)
    ? 'Ja'
    : entity?.dates?.find((item) => item?.isRemote)
    ? 'Tw.'
    : 'Nein';

const calculateTimeslot = (startTime: Time, duration: Time) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const [durHours, durMinutes] = duration.split(':').map(Number);

  const totalMinutes = hours * 60 + minutes + durHours * 60 + durMinutes;

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  // Formatting the result
  const paddedHours = String(newHours).padStart(2, '0');
  const paddedMinutes = String(newMinutes).padStart(2, '0');

  const nextStartTime = `${paddedHours}:${paddedMinutes}`;
  const timeslot = `${startTime} - ${nextStartTime}`;
  // return `${paddedHours}:${paddedMinutes}`;

  return { timeslot, nextStartTime };
};

const auditplan = (entity: FileQuery['file']['entity']) => {
  const dates = entity?.dates?.map((date) => date?.date);
  const locations = entity?.dates?.map((date) => date?.location);

  let rows: any[] = [];

  dates?.forEach((date, i) => {
    rows.push([
      readableDateFromDatetime(dates[i] as string),
      locations![i],
      ' ',
      ' ',
    ]);

    let startTime = entity?.dates![i]?.startTime;

    entity?.dates![i]?.sessions?.forEach((session, j) => {
      const sessionDuration: Time =
        (entity.dates![i]?.sessions![j]?.duration as Time) ?? '00:00';

      const timeslotAndNextTime = calculateTimeslot(
        startTime as Time,
        sessionDuration
      );

      const timeslot = timeslotAndNextTime.timeslot;
      startTime = timeslotAndNextTime.nextStartTime;

      const sections = session?.sections?.map((section, j) => {
        if (j === 0) {
          return section;
        } else {
          const previousSection = session.sections![j - 1];
          return previousSection && section?.startsWith(previousSection)
            ? section.replace(previousSection, '')
            : undefined;
        }
      });
      const context = [session?.context ?? session?.reusableContext].concat(
        sections
      );

      const partners = session?.partners?.map((person) => person);
      const auditors = session?.auditors?.map((person) => person);

      rows.push([[timeslot], context, partners, auditors]);
    });
  });

  return rows;
};

const fieldStandardType = (
  entity: FileQuery['file']['entity'],
  index: number
) => {
  const standard = entity?.standards?.find((item, i) => i === index);
  return standard ? standard.isoAuditTypeRelation : undefined;
};

const fieldStandard = (entity: FileQuery['file']['entity'], index: number) => {
  const standard = entity?.standards?.find((item, i) => i === index);
  return standard ? standard.standard?.name : undefined;
};

const fieldRegNumber = (entity: FileQuery['file']['entity'], index: number) => {
  const standard = entity?.standards?.find((item, i) => i === index);
  return standard ? standard.registrationNumber : undefined;
};
