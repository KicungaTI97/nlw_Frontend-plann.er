import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";


interface DestinationAndDateStepProps{
    eventStartAndEndDates: DateRange | undefined
    isGuestsInputOpen: boolean
    closeGuestsInput: () =>void
    openGuestsInput: () => void
    setDestionation: (destination: string) => void
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}
export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestionation,
    setEventStartAndEndDates,
    eventStartAndEndDates
}:DestinationAndDateStepProps){
  const[isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker(){
    setIsDatePickerOpen(true)
  }

  function closeDatePicker(){
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
  : null;

    return(
      <div className='flex gap-1'>
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
          <div className='flex items-center gap-2 flex-1 '>
          <MapPin className='size-5 text-zinc-400'/>
          <input 
            disabled={isGuestsInputOpen} 
            type="text" 
            placeholder="Para onde você vai?" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={event => setDestionation(event.target.value)}
            />
            
          </div>
  
          <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='flex items-center gap-2 text-left w-[240px]'>
            <Calendar className='size-5 text-zinc-400'/>
            <span className="text-lg w-40 text-left flex-1" >
              {displayedDate || 'Quando?'}
            </span>
          </button>

        {isDatePickerOpen &&(
          <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
              <h1 className='text-lg font-semibold'>Selecione a data</h1>
              <Button onClick={closeDatePicker}  variant="secondary" >
                <X className='size-5 text-zinc-400'/>
              </Button>
      
              </div>
            </div>
            <DayPicker 
             mode="range"
             selected={eventStartAndEndDates} 
             onSelect={setEventStartAndEndDates}/>
            </div>
          </div>
        ) }
  
          <div className='w-px h-6 bg-zinc-800' />

           {isGuestsInputOpen ? (
            <Button onClick={closeGuestsInput} variant="secondary">
              Alterar local/data
              <Settings2 className='size-5'/>
            </Button>
           ) : (
          <Button onClick={openGuestsInput} variant="primary">
            Continuar
            <ArrowRight className='size-5'/>
          </Button>
           )
           }
          </div>
  
  
      </div>
    )
}