import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { LocationDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { useGetEvents } from "../../../api/events";
import { useEditLocation } from "../../../api/locations";

export const EditLocationSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  locationUrl: z.string(),
  eventIds: z.array(z.number()),
});

type EditLocationSchemaType = z.infer<typeof EditLocationSchema>;

export const EditLocationForm: React.FC<{
  onSubmit: () => void;
  locationData: LocationDetailsResponseSchema;
}> = ({ onSubmit, locationData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLocationSchemaType>({
    resolver: zodResolver(EditLocationSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: locationData.name,
      address: locationData.address,
      city: locationData.city,
      locationUrl: locationData.locationURL,
      eventIds: locationData.events.map((event) => event.eventId),
    },
  });

  const { mutateAsync: EditRecord, isLoading } = useEditLocation(
    locationData.locationId.toString()
  );

  const {
    data: eventData,
    status: eventStatus,
    error: eventError,
  } = useGetEvents();

  const mappedEvents =
    eventData?.items.map((event) => ({
      valueId: event.eventId,
      name: event.name,
    })) ?? [];

  const submit = async (payload: EditLocationSchemaType) => {
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
        Edytuj event: {locationData.name}
      </Title>
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
        defaultValue={locationData.name}
      />
      <ControlledInput
        name="address"
        label="Adres"
        control={control}
        errors={errors}
        defaultValue={locationData.address}
      />
      <ControlledInput
        name="city"
        label="Miasto"
        control={control}
        errors={errors}
        defaultValue={locationData.city}
      />
      <ControlledInput
        name="locationUrl"
        label="Url lokacji"
        control={control}
        errors={errors}
        defaultValue={locationData.locationURL}
      />
      <Form.Item
        name="eventIds"
        label="Eventy"
        help={errors.eventIds?.message as string}
        validateStatus={errors.eventIds ? "error" : ""}
      >
        <Controller
          name="eventIds"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedEvents }}
              error={eventError}
              status={eventStatus}
              {...field}
              data={locationData.events.map((item) => ({
                valueId: item.eventId,
                name: item.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Wyślij
      </Button>
    </Form>
  );
};
