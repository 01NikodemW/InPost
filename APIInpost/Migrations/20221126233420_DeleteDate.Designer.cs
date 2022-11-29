﻿// <auto-generated />
using System;
using APIInpost.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace APIInpost.Migrations
{
    [DbContext(typeof(InpostDbContext))]
    [Migration("20221126233420_DeleteDate")]
    partial class DeleteDate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("APIInpost.Entities.Parcel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("DeliveryStatus")
                        .HasColumnType("int");

                    b.Property<Guid>("DestinationLockerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ReciverId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("SenderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("SourceLockerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DestinationLockerId");

                    b.HasIndex("ReciverId");

                    b.HasIndex("SenderId");

                    b.HasIndex("SourceLockerId");

                    b.ToTable("Parcels");

                    b.HasData(
                        new
                        {
                            Id = new Guid("32954d68-2ff6-4608-acaa-122760ab71c6"),
                            DeliveryStatus = 0,
                            DestinationLockerId = new Guid("f113942e-d82b-4ac2-a5c1-35c5cff7053a"),
                            Name = "Duza paczka",
                            ReciverId = new Guid("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"),
                            SenderId = new Guid("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"),
                            SourceLockerId = new Guid("97808418-1ad7-4092-8f50-062ee13d4b4e"),
                            Weight = 20
                        },
                        new
                        {
                            Id = new Guid("84f4e618-8c77-4b51-bd04-8cf831f52073"),
                            DeliveryStatus = 0,
                            DestinationLockerId = new Guid("d159e481-5737-4368-b18b-ea5ac8ae14a3"),
                            Name = "Mala paczka",
                            ReciverId = new Guid("7e58ea70-72da-4987-ab33-6827aa05ab38"),
                            SenderId = new Guid("675bc66b-2f0f-426d-822c-e04c9ada8280"),
                            SourceLockerId = new Guid("b366ff28-9316-4c1d-a480-43817ef9226e"),
                            Weight = 5
                        });
                });

            modelBuilder.Entity("APIInpost.Entities.ParcelLocker", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ParcelLockers");

                    b.HasData(
                        new
                        {
                            Id = new Guid("97808418-1ad7-4092-8f50-062ee13d4b4e"),
                            Name = "Warszawska"
                        },
                        new
                        {
                            Id = new Guid("f113942e-d82b-4ac2-a5c1-35c5cff7053a"),
                            Name = "Sopocka"
                        },
                        new
                        {
                            Id = new Guid("b366ff28-9316-4c1d-a480-43817ef9226e"),
                            Name = "Lodzka"
                        },
                        new
                        {
                            Id = new Guid("d159e481-5737-4368-b18b-ea5ac8ae14a3"),
                            Name = "Krakowska"
                        });
                });

            modelBuilder.Entity("APIInpost.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"),
                            UserName = "Jan"
                        },
                        new
                        {
                            Id = new Guid("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"),
                            UserName = "Tomasz"
                        },
                        new
                        {
                            Id = new Guid("675bc66b-2f0f-426d-822c-e04c9ada8280"),
                            UserName = "Ziemowit"
                        },
                        new
                        {
                            Id = new Guid("7e58ea70-72da-4987-ab33-6827aa05ab38"),
                            UserName = "Anna"
                        });
                });

            modelBuilder.Entity("APIInpost.Entities.Parcel", b =>
                {
                    b.HasOne("APIInpost.Entities.ParcelLocker", "DestinationLocker")
                        .WithMany("ParcelsToPickup")
                        .HasForeignKey("DestinationLockerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIInpost.Entities.User", "Reciver")
                        .WithMany("RecievedParcels")
                        .HasForeignKey("ReciverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIInpost.Entities.User", "Sender")
                        .WithMany("SentParcels")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("APIInpost.Entities.ParcelLocker", "SourceLocker")
                        .WithMany("ParcelsToSend")
                        .HasForeignKey("SourceLockerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("DestinationLocker");

                    b.Navigation("Reciver");

                    b.Navigation("Sender");

                    b.Navigation("SourceLocker");
                });

            modelBuilder.Entity("APIInpost.Entities.ParcelLocker", b =>
                {
                    b.Navigation("ParcelsToPickup");

                    b.Navigation("ParcelsToSend");
                });

            modelBuilder.Entity("APIInpost.Entities.User", b =>
                {
                    b.Navigation("RecievedParcels");

                    b.Navigation("SentParcels");
                });
#pragma warning restore 612, 618
        }
    }
}
