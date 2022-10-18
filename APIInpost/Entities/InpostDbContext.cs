using Microsoft.EntityFrameworkCore;

namespace APIInpost.Entities
{
    public class InpostDbContext : DbContext
    {
        public InpostDbContext(DbContextOptions<InpostDbContext> options) :
            base(options)
        {
        }

        private string
            _connectionString =
                "Server=(localdb)\\mssqllocaldb;Database=InpostDb;Trusted_Connection=True;";

        public DbSet<Parcel> Parcels { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<ParcelLocker> ParcelLockers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parcel>().Property(x => x.Name).IsRequired();
            modelBuilder.Entity<Parcel>().Property(x => x.Weight).IsRequired();
            ParcelSeeder.SeedData (modelBuilder);

            modelBuilder.Entity<Parcel>()
            .HasOne(x => x.DestinationLocker)
            .WithMany(x => x.ParcelsToPickup)
            .HasForeignKey(x => x.DestinationLockerId);

            modelBuilder.Entity<Parcel>()
            .HasOne(x => x.SourceLocker)
            .WithMany(x => x.ParcelsToSend)
            .HasForeignKey(x => x.SourceLockerId)
            .OnDelete(DeleteBehavior.NoAction);

            
            modelBuilder.Entity<Parcel>()
            .HasOne(x => x.Reciver)
            .WithMany(x => x.RecievedParcels)
            .HasForeignKey(x => x.ReciverId);

            modelBuilder.Entity<Parcel>()
            .HasOne(x => x.Sender)
            .WithMany(x => x.SentParcels)
            .HasForeignKey(x => x.SenderId)
            .OnDelete(DeleteBehavior.NoAction);
        }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder
        )
        {
            optionsBuilder.UseSqlServer (_connectionString);

    
        }
    }
}
