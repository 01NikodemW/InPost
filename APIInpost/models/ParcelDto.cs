using APIInpost.Enum;

namespace APIInpost.models
{
    public class ParcelDto
    {

        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public int Weight { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }

        public Guid SourceLockerId { get; set; } 

        public Guid DestinationLockerId { get; set; }
        
        public Guid SenderId { get; set; } 

        public Guid ReciverId { get; set; }

        public virtual ShortUserDto Sender { get; set; }
        public virtual ShortUserDto Reciver { get; set; }
        public virtual ShortParcelLockerDto SourceLocker { get; set; }
        public virtual ShortParcelLockerDto DestinationLocker { get; set; }

        // public string SenderName { get; set; } = default!;
        // public string ReceiverName { get; set; } = default!;
        // public string SourceLockerName { get; set; } = default!;
        // public string DestinationLockerName { get; set; } = default!;

    
    }
}