"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useAvailabiltyQuery } from "@/services/availability/availabilityQuery";
import { CreateTimeSlot, DaySchedule } from "@/types";
import { useAvailabiltyMutation } from "@/services/availability/AvailbilityMutaition";
import { daysOfWeek } from "@/constants";
import { toast } from "sonner";

const AvailabilitySchedule = () => {
  const { data, isPending } = useAvailabiltyQuery();
  const { mutate } = useAvailabiltyMutation();
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map((day) => ({
      day,
      enabled: false,
      slots: [],
    }))
  );

  useEffect(() => {
    if (data) {
      const dataTransformed = data.map(({ day, slots }: DaySchedule) => ({
        day,
        enabled: !!day,
        slots,
      }));
      setSchedule((prev) =>
        prev.map((daySchedule) => {
          const matched = dataTransformed.find(
            (day: DaySchedule) => day.day === daySchedule.day
          );
          return matched ? matched : daySchedule;
        })
      );
    }
  }, [data, isPending]);

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    if (newSchedule[index].enabled) {
      newSchedule[index].slots = [{ from: "", to: "" }];
    } else {
      newSchedule[index].slots = []
    }
    setSchedule(newSchedule);
  };

  const handleSlotsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayIndex: number,
    slotIndex: number,
  ) => {
    const { name, value } = e.target
    const newSchedule = [...schedule];
    const field = name as keyof CreateTimeSlot;
    const currentSlot = {...newSchedule[dayIndex].slots[slotIndex] , [field]: value};
    if (field === "from" && currentSlot.to && value >= currentSlot.to) {
      toast.error(`Start time must be before end time`, { position: "top-right" });
      return;
    }
    if (field === "to" && currentSlot.from && value <= currentSlot.from) {
      toast.error(`End time must be after start time`, { position: "top-right" });
      return;
    }
    const overlap = newSchedule[dayIndex].slots.some((slot, index) => {
      if(index === slotIndex) return false
      return slot.from < currentSlot.to && currentSlot.from < slot.to
    });
    if (overlap) {
      toast.error(`slot can over lap with other slots`, { position: "top-right" });
      return;
    }
    newSchedule[dayIndex].slots[slotIndex] = currentSlot;
    setSchedule(newSchedule);
  };

  const addSlot = (
    e: React.MouseEvent<HTMLButtonElement>, 
    dayIndex: number,
    slotIndex: number,
  ) => {
    e.preventDefault();
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex + 1 , 0, { from: "", to: "" });
    setSchedule(newSchedule);
  };

  const removeSlot = (
    e: React.MouseEvent<HTMLButtonElement>,
    dayIndex: number,
    slotIndex: number
  ) => {
    e.preventDefault();
    if (schedule[dayIndex].slots.length === 1) {
      return;
    }
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);
    setSchedule(newSchedule);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredData = schedule
      .filter((item) => item.enabled)
      .map((item) => ({
        ...item,
        slots: item.slots.filter((slot) => slot.from !== "" || slot.to !== ""),
      }))
      .filter((item) => item.slots.length > 0);
    mutate(filteredData);
  };

  return (
    <div className="mt-5 max-h-full">
      <form onSubmit={handleSubmit}>
        <div className="max-h-[600px] overflow-y-scroll">
          {schedule.map((item, index) => (
            <div key={`${item.day}-${index}`} className="flex gap-x-12">
              <div className="flex-1 flex flex-row-reverse justify-end items-center p-5">
                <label htmlFor="" className="flex p-2 text-xl">{item.day}</label>
                <input
                  type="checkbox"
                  className="text-5xl scale-150"
                  checked={item.enabled}
                  onChange={() => toggleDay(index)}
                />
              </div>
              <div
                className={`flex-7 flex flex-col justify-center ${item.enabled && "border-b-2 py-5"} `}>
                {item.enabled ? (
                  item.slots.map((slot: CreateTimeSlot, slotIndex) => (
                    <div
                      key={slotIndex} className="flex justify-between p-2 gap-10">
                      <div className="flex-2 flex items-center">
                        <label htmlFor="" className="text-xl mr-4">from</label>
                        <input
                          type="time"
                          name={`from`}
                          className="flex-3 border-2 rounded-xl py-4 px-4"
                          onChange={(e) => handleSlotsInputChange(e, index, slotIndex)}
                          value={slot.from}
                        />
                      </div>
                      <div className="flex-2 flex  items-center">
                        <label htmlFor="" className="text-xl mr-4">to</label>
                        <input
                          type="time"
                           name={`to`}
                          className="flex-3 rounded-xl border-2 py-4 px-4"
                          onChange={(e) => handleSlotsInputChange(e, index, slotIndex)}
                          value={slot.to}
                        />
                      </div>
                      <div className="flex-1 flex justify-around items-center">
                        <Button className="bg-blue-600" onClick={(e) => removeSlot(e, index, slotIndex)}>
                          <Minus />
                        </Button>
                        <Button className="bg-blue-600" onClick={(e) => addSlot(e, index, slotIndex)}>
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between p-2 text-xl">
                    <span>Unavailable</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end py-8">
          <input
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  );
};

export default AvailabilitySchedule;
