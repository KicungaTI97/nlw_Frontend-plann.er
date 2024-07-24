import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invate-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTripPage(){
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'Kicungati@gmail.com',
    'johnDoe@gmail.com.br'
  ])

  const [destination, setDestionation] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()


  function openGuestsInput(){
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput(){
    setIsGuestsInputOpen(false);
  }

  function openGuestModal(){
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }
  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
  event.preventDefault();


  const data = new FormData(event.currentTarget);
  const email = data.get('email')?.toString()

  if(!email){
    return;
  }
  if(emailsToInvite.includes(email)){
    return;
  }
  setEmailsToInvite([
    ...emailsToInvite,
     email
    ])

    event.currentTarget.reset();

}

function removeEmailFromInvites(emailToRemove: string){
  const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

  setEmailsToInvite(newEmailList)
}

 async function createTrip(event: FormEvent<HTMLFormElement>){
  event.preventDefault();
  console.log(destination)
  console.log(eventStartAndEndDates)
  console.log(emailsToInvite)
  console.log(ownerEmail)
  console.log(ownerName)

  if(!destination){
    return;
  }

  if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to){
    return;
  }

  if(emailsToInvite.length === 0){
    return;
  }

  if(!ownerEmail || !ownerName){
    return 0;
  }

  const response = await api.post('/trips',
    {
    destination,
    starts_at: eventStartAndEndDates.from,
    ends_at: eventStartAndEndDates.to,
    emails_to_invite: emailsToInvite,
    owner_name: ownerName,
    owner_email: ownerEmail
  })

  const{tripId} = response.data
  navigate(`/trips/${tripId}`)

}
  return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
    <div className="max-w-3xl w-full px-6 text-center space-y-10">
      <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="plann.er" />
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
      </div>

  <div className='space-y-4'>
    <DestinationAndDateStep
    closeGuestsInput={closeGuestsInput}
    isGuestsInputOpen={isGuestsInputOpen}
    openGuestsInput={openGuestsInput}
    setDestionation={setDestionation}
    eventStartAndEndDates={eventStartAndEndDates}
    setEventStartAndEndDates = { setEventStartAndEndDates}
    
    />
      {isGuestsInputOpen && (
        <InviteGuestStep
          emailsToInvite={emailsToInvite}
          openConfirmTripModal={openConfirmTripModal}
          openGuestModal={openGuestModal}
        />
      )}

  </div>
      <p className="text-sm text-zinc-500">
        Ao planejar a sua viagem pela palm.er 
        você automaticamente concorda <br />
        com nossos <a className="text-zinc-300 underline" href="#">termos
        de uso</a>  e <a className="text-zinc-300 underline"  href="#">politicas de privacidade</a>.
      </p>
    </div>

    {isGuestsModalOpen && (
      <InviteGuestsModal
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        removeEmailFromInvites={removeEmailFromInvites}
        closeGuestsModal={closeGuestsModal}
      />
    )}
   {isConfirmTripModalOpen &&(
     <ConfirmTripModal
     closeConfirmTripModal={closeConfirmTripModal}
     createTrip={createTrip}
     setOwnerName={setOwnerName}
     setOwnerEmail={setOwnerEmail}
     />
   )}
    </div>
    )

}

