using APIInpost.Entities;
using APIInpost.Enum;
using Microsoft.EntityFrameworkCore;

namespace APIInpost
{
    public static class ParcelSeeder
    {
        public static void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parcel>().HasData(GetParcels());
            modelBuilder.Entity<ParcelLocker>().HasData(GetParcelLockers());
            modelBuilder.Entity<User>().HasData(GetUsers());
        }

        private static IEnumerable<User> GetUsers()
        {
            var users =
                new List<User>()
                {
                    new User()
                    {
                        Id = Guid.Parse("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"),
                        UserName = "Jan"
                    },
                    new User()
                    {
                        Id = Guid.Parse("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"),
                        UserName = "Tomasz"
                    },
                    new User()
                    {
                        Id = Guid.Parse("675bc66b-2f0f-426d-822c-e04c9ada8280"),
                        UserName = "Ziemowit"
                    },
                    new User()
                    {
                        Id = Guid.Parse("7e58ea70-72da-4987-ab33-6827aa05ab38"),
                        UserName = "Anna"
                    }
                };

            return users;
        }

        private static IEnumerable<ParcelLocker> GetParcelLockers()
        {
            var parcelLockers =
                new List<ParcelLocker>()
                {
                    new ParcelLocker()
                    {
                        Id = Guid.Parse("97808418-1ad7-4092-8f50-062ee13d4b4e"),
                        Name = "Warszawska"
                    },
                    new ParcelLocker()
                    {
                        Id = Guid.Parse("f113942e-d82b-4ac2-a5c1-35c5cff7053a"),
                        Name = "Sopocka"
                    },
                    new ParcelLocker()
                    {
                        Id = Guid.Parse("b366ff28-9316-4c1d-a480-43817ef9226e"),
                        Name = "Lodzka"
                    },
                    new ParcelLocker()
                    {
                        Id = Guid.Parse("d159e481-5737-4368-b18b-ea5ac8ae14a3"),
                        Name = "Krakowska"
                    }
                };

            return parcelLockers;
        }

        private static IEnumerable<Parcel> GetParcels()
        {
            var parcels =
                new List<Parcel>()
                {
                    new Parcel()
                    {
                        Id = Guid.Parse("32954d68-2ff6-4608-acaa-122760ab71c6"),
                        Name = "Duza paczka",
                        Weight = 20,
                        SenderId =
                            Guid.Parse("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"),
                        ReciverId =
                            Guid.Parse("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"),
                        SourceLockerId =
                            Guid.Parse("97808418-1ad7-4092-8f50-062ee13d4b4e"),
                        DestinationLockerId =
                            Guid.Parse("f113942e-d82b-4ac2-a5c1-35c5cff7053a"),
                        DateOfSent = 0,
                        DeliveryStatus = DeliveryStatus.Sent
                    },
                    new Parcel()
                    {
                        Id = Guid.Parse("84f4e618-8c77-4b51-bd04-8cf831f52073"),
                        Name = "Mala paczka",
                        Weight = 5,
                        SenderId =
                            Guid.Parse("675bc66b-2f0f-426d-822c-e04c9ada8280"),
                        ReciverId =
                            Guid.Parse("7e58ea70-72da-4987-ab33-6827aa05ab38"),
                        SourceLockerId =
                            Guid.Parse("b366ff28-9316-4c1d-a480-43817ef9226e"),
                        DestinationLockerId =
                            Guid.Parse("d159e481-5737-4368-b18b-ea5ac8ae14a3"),
                        DateOfSent = 0,
                        DeliveryStatus = DeliveryStatus.Sent
                    }
                };

            return parcels;
        }
    }
}
