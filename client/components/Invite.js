import React from 'react'
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { FaUserGroup } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { RiUserVoiceLine } from "react-icons/ri";
import { RiUserHeartLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";





const Invite = ({setIsInviteOpen}) => {
    const[data, setData]=useState({
        email:[], 
        inviteType:"",
        date:"",
        channels:[]    
    })
    const [selectedChannel, setSelectedChannel] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const[day, setDay]=useState(null);
  const [nonSelectedChannel, setNonSelectedChannel] = useState([
    "Town Hall",
    "Feedback",
    "Food Complaints",
    "Design Team",
    "Developers",
    "Design brainstorming",
    "Marketing",
    "Product Market-fit",
    "Server",
    "Managers",
    "Test",
    "R&D",
    "Data Base",
    "Office",
    "CEO"
  ]);

    const[toggle, SetToggle]=useState({inviteType:false, date:false})
    const [isChannelClose, setIsChannelClose]=useState(true);
    const [isGuestOrCustomer, setIsGuestOrCustomer]=useState(false)
    const[isShowDatePicker, setIsShowDatePicker]=useState(false);

    const type=["Admin", "Member", "Guest", "Customer"];

    const date=["Never", "7 days", "30 days", "60 days", "custom"];
    

    const handleToggle=(type)=>{
        SetToggle((prev) => ({ ...prev, [type]: !prev[type] }));
    }
    
    const handleSelectionChange = (item) => {
        if (selectedChannel.includes(item)) {
          // Remove from selectedChannel and add back to nonSelectedChannel
          setSelectedChannel((prev) => prev.filter((channel) => channel !== item));
          setNonSelectedChannel((prev) => [...prev, item]);
        } else {
          // Add to selectedChannel and remove from nonSelectedChannel
          setSelectedChannel((prev) => [...prev, item]);
          setNonSelectedChannel((prev) => prev.filter((channel) => channel !== item));
        }
      };

      const handleChannel=(e)=>{
        console.log(e);
        const newIsChannelClose = !(data.inviteType === "Guest" || data.inviteType === "Customer");
        setIsChannelClose(newIsChannelClose);
      
        // Use the updated value directly
        setIsGuestOrCustomer(!newIsChannelClose);
      }

      const handleInviteType=(item)=>{
        setData((prev) => ({
          ...prev,
          inviteType: prev.inviteType === item ? "" : item,
        }))
      const status=!(item==='Admin'|| item==='Member')
      if(!status){
        setIsGuestOrCustomer(status);
        selectedChannel.length = 0;
        setData((prev)=>({...prev, date:""}));
        setNonSelectedChannel(["Town Hall",
    "Feedback",
    "Food Complaints",
    "Design Team",
    "Developers",
    "Design brainstorming",
    "Marketing",
    "Product Market-fit",
    "Server",
    "Managers",
    "Test",
    "R&D",
    "Data Base",
    "Office",
    "CEO"])
      } 
      }

      const handleDate=(item)=>{
        setData((prev)=>({...prev, date:item}))
        if(item==="custom"){
          setIsShowDatePicker(true);
        }
        }

        const handleCustomeDate=(item)=>{
          setData((prev)=>({...prev, date:item}))
          setIsShowDatePicker(false);
          handleToggle('date');
        }
      
        
     const filteredNonSelectedChannel=nonSelectedChannel ? nonSelectedChannel.filter(data=>
        data.toLowerCase().includes(searchQuery.toLowerCase())):[];

  return (
    <div className='bg-gray-800 flex flex-col justify-start items-start space-y-3 py-8 px-4 border border-gray-600 rounded-lg h-screen min-w-md w-[450px] overflow-y-scroll scrollbar-custom'>
        {isChannelClose ?
        <>
          <div className='w-full flex flex-row justify-between items-center space-x-3'>
            <h1 className='text-sm'>Request invitations to pepul</h1>
            <IoClose onClick={()=>setIsInviteOpen(false)}/>
        </div>

        <div className='flex flex-col space-2 w-full'>
            <label  className='text-xs'>To:</label>
            <input  className='text-start px-2 text-xs w-full border h-[79px]  border-gray-600 text-gray-400 bg-gray-800 rounded-md' placeholder='name@pepul.com'/>
        </div>

        <div className='relative w-full '>
            <label className='text-xs'>Invite as</label>

            <div onClick={()=>handleToggle('inviteType')} className={`flex flex-row w-full justify-between items-center px-2 py-1 border border-gray-600 rounded-md ${toggle.inviteType ? 'rounded-bl-none rounded-br-none': 'rounded-md'}`}>
            <div  className="text-xs ">
            {data.inviteType && typeof data.inviteType === 'string' ? data.inviteType : "Select Type"}
            </div>
            <MdKeyboardArrowDown size={24}/>
            </div>

            {toggle.inviteType &&(
                <div className='border border-gray-500 rounded-bl-md rounded-br-md '>
                    {type.map((item, index)=>(
                    <div onClick={()=>handleInviteType(item)} key={index} className='flex flex-row justify-start items-center space-x-2  text-xs  px-4 py-2 cursor-pointer '>
                    {item === 'Admin' && <FaUserCheck className=' text-indigo-500 '/>}
                    {item === 'Member' && <FaUserGroup className=' text-green-500 ' />}

                    {item === 'Guest' && <RiUserVoiceLine className=' text-amber-500 ' />}

                    {item === 'Customer' && <RiUserHeartLine className=' text-red-500 ' />}

                    <p className='text-xs'>{item }</p>
                    </div>
                    ))}
                </div>
            )}
        </div>

        { isGuestOrCustomer && <div className='relative w-full '>
            <label className='text-xs'>Set an Expiration Date <span className='text-[10px]'>Optional</span></label>

            <div onClick={()=>handleToggle('date')} className={`flex flex-row w-full justify-between items-center px-2 py-1 border border-gray-600 rounded-md ${toggle.date ? 'rounded-bl-none rounded-br-none': 'rounded-md'}`}>
            <div  className="text-xs " >
            {data.date && typeof data.date === 'string' ? data.date : "Select Date"}
            </div>
            <MdKeyboardArrowDown size={24}/>
            </div>

            {toggle.date &&(
                <div className='border border-gray-500 rounded-bl-md rounded-br-md '>
                    {date.map((item, index)=>(
                    <div onClick={()=>handleDate(item)} key={index} className='flex flex-row justify-start items-center space-x-2  text-xs  px-4 py-2 cursor-pointer '>
                    

                    <p className='text-xs'>{item }</p>
                    </div>
                    ))}
                </div>
            )}
        </div>}

       { !isGuestOrCustomer && <div className='w-full'>
            <label className='text-xs'>Share a Workspace Link</label>
            <input className='text-center text-xs w-full border h-8  px- border-gray-600 text-gray-400 bg-gray-800 rounded-md' />
        </div> }

        
        


         { isGuestOrCustomer && <div className='flex flex-col space-y-3 w-full'>
            <h1 className='text-sm'>Channels</h1>
            
            <div className='flex flex-wrap gap-[10px] min-h-7 border border-gray-600 pt-2 rounded-md'>
            {selectedChannel.map((item, index)=>(
                    <div key={index} className='bg-blue-900 cursor-pointer hover:scale-105 space-x-1 border border-gray-500 rounded-md flex flex-row items-center px-2 py-1'><p className='text-yellow-600 text-xs'>#</p><p className='text-xs'>{item}</p> <IoClose onClick={()=> handleSelectionChange(item)} size={24}/>
                    </div>
                ))}
            </div>
            </div>}
            
            <div className='flex flex-row justify-center space-x-3 items-center w-full'>
           {isGuestOrCustomer && <button onClick={()=>setIsChannelClose(false)} className='w-full border border-yellow-400 rounded-md text-center py-1 bg-amber-500 text-black text-sm'>Go Back</button>}
           
           <button 
            onClick={(e) => handleChannel(e)} 
            className=' w-full border border-yellow-400 rounded-md text-center py-1 bg-amber-500 text-black text-sm'>
            {(isGuestOrCustomer || data.inviteType === 'Member' || data.inviteType == 'Admin') ? "Invite" : "Next"}
            </button>
            </div>
        

         </>:

         <div className='flex flex-col space-y-3 w-full'>
         <div className='flex justify-between items-center'>
         <h1 className='text-sm'>Add Channel</h1>
          <IoClose onClick={()=>setIsInviteOpen(false)}/>
          </div>
          <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className=' text-center text-xs w-full border h-8  px-2 border-gray-600 text-gray-400 bg-gray-800 rounded-md' placeholder='Search Channel Here'/>
          <div className='flex flex-wrap gap-[10px] border-t-2 border-gray-600 pt-2'>
          {selectedChannel.map((item, index)=>(
                  <div key={index} className='bg-blue-900 cursor-pointer hover:scale-105 space-x-1 border border-gray-500 rounded-md flex flex-row items-center px-2 py-1'><p className='text-yellow-600 text-xs'>#</p><p className='text-xs'>{item}</p> <IoClose onClick={()=> handleSelectionChange(item)} size={24}/>
                  </div>
              ))}
          </div>
          <div  className='flex flex-wrap gap-[10px] border-t-2 border-gray-600 pt-2'>
              {filteredNonSelectedChannel.map((item, index)=>(
                  <div onClick={()=> handleSelectionChange(item)} key={index} className='cursor-pointer hover:scale-105 space-x-1 border border-gray-500 rounded-md flex flex-row px-2 py-1'><p className='text-yellow-600 text-xs'>#</p><p className='text-xs'>{item}</p></div>
              ))}
          </div>
          <button onClick={()=>setIsChannelClose(true)} className='w-full border border-yellow-400 rounded-md text-center py-1 bg-amber-500 text-black text-sm'>Next</button>
      </div> 

            
        }

{isShowDatePicker && (
<div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full z-50"
    onClick={() => setIsShowDatePicker(false)} // Close when clicking outside
  >
    <div
      // className="bg-white p-6 rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <DatePicker
      className=" h-[40px] border bg-gray-800 text-white rounded-2xl hover:bg-blue-400 hover:rounded-xl focus:ring-2 focus:ring-indigo-400 "
        selected={day} // Controlled selected date
        onChange={(date) => setDay(date)}
        inline // Show calendar inline
  calendarClassName="custom-datepicker" // Custom class for date picker (for global styles)
  popperPlacement="bottom-start" // Position the calendar at the bottom-left of the input
  renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
    <div className="flex flex-col py-1 w-full">
      {/* Month/Year Navigation */}
      <div className="flex py-1 justify-between items-center">
        <span className="text-white font-semibold text-sm">
          {monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <div className="flex flex-row space-x-2">
          <button onClick={decreaseMonth}>
            <MdOutlineKeyboardArrowLeft size={34} />
          </button>
          <button onClick={increaseMonth}>
            <MdOutlineKeyboardArrowRight size={34} />
          </button>
        </div>
      </div>
      
    </div>
  )}
 />
    </div>
  </div>
)}

</div>

  )
}

export default Invite