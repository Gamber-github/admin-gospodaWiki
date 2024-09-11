import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { EventDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { useGetTags } from "../../../api/tags";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";
import { ControlledDatePicker } from "../../UI/DatePicker/ControlledDatePicker";
import { useGetLocations } from "../../../api/locations";
import { useEditEvent } from "../../../api/events";

export const EditEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  eventUrl: z.string(),
  locationId: z.number(),
  date: z.string(),
  tagsIds: z.array(z.number()),
});

type EditEventSchemaType = z.infer<typeof EditEventSchema>;

export const EditEventForm: React.FC<{
  onSubmit: () => void;
  eventData: EventDetailsResponseSchema;
}> = ({ onSubmit, eventData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditEventSchemaType>({
    resolver: zodResolver(EditEventSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: eventData.name,
      description: eventData.description,
      eventUrl: eventData.eventUrl,
      locationId: eventData.location.locationId,
      date: eventData.date,
      tagsIds: eventData.tags.map((tag) => tag.tagId),
    },
  });

  const { mutateAsync: EditRecord, isLoading } = useEditEvent(
    eventData.eventId.toString()
  );

  const {
    data: tagData,
    status: tagStatus,
    error: tagError,
  } = useGetTags({
    pageSize: 100,
  });

  const {
    data: locationData,
    status: locationStatus,
    error: locationError,
  } = useGetLocations();

  const mappedTags =
    tagData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const mappedLocations =
    locationData?.items.map((location) => ({
      valueId: location.locationId,
      name: location.name,
    })) ?? [];

  const submit = async (payload: EditEventSchemaType) => {
    try {
      console.log(payload);
      await EditRecord(payload);
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj event: {eventData.name}
      </Title>
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
        defaultValue={eventData.name}
      />
      <Form.Item
        name="tagIds"
        label="Tagi"
        help={errors.tagsIds?.message as string}
        validateStatus={errors.tagsIds ? "error" : ""}
      >
        <Controller
          name="tagsIds"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedTags }}
              error={tagError}
              status={tagStatus}
              {...field}
              data={eventData.tags.map((item) => ({
                valueId: item.tagId,
                name: item.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="locationId"
        label="Lokalizacja"
        help={errors.locationId?.message as string}
        validateStatus={errors.locationId ? "error" : ""}
      >
        <Controller
          name="locationId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedLocations }}
              error={locationError}
              status={locationStatus}
              {...field}
              data={
                eventData.location.locationId && eventData.location.name
                  ? {
                      valueId: eventData.location.locationId,
                      name: eventData.location.name,
                    }
                  : undefined
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <ControlledInput
        name="eventUrl"
        label="URL Eventu"
        control={control}
        errors={errors}
        defaultValue={eventData.eventUrl}
      />
      <ControlledDatePicker
        name="date"
        label="Data"
        control={control}
        errors={errors}
        defaultValue={eventData.date}
      />
      <ControlledTextArea
        errors={errors}
        control={control}
        name="description"
        label="Opis Eventu"
        defaultValue={eventData.description}
      />
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Wyślij
      </Button>
    </Form>
  );
};
