"use client";
import { use, useEffect, useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";
import InformationTag from "@/components/elements/tags/InformationTag/InformationTag";
import { getProfile, getRepos } from "@/api/profile";
import RepoCard from "@/components/elements/cards/RepoCard/RepoCard";
import { UserI } from "@/models/user.model";
import { RepoI } from "@/models/repo.model";
import HomeSkeleton from "./HomeSkeleton";
import Image from "next/image";
import { useUserContext } from "@/context/Context";

const HomeLayout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [repos, setRepos] = useState<RepoI[] | []>([]);
  const [selectedRepos, setSelectedRepos] = useState<RepoI[] | []>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user, updateUser} = useUserContext();


  async function fetchProfile(name: string) {
    try {
      const data = await getProfile(name);
      updateUser(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: HomeLayout.tsx:21 ~ fetchProfile ~ error:",
        error
      );
    }
  }
  async function fetchRepos(name: string) {
    try {
      const data = await getRepos(name);
      setRepos(data);
      setSelectedRepos(data.slice(0, 4));
    } catch (error) {
      console.log("🚀 ~ file: HomeLayout.tsx:30 ~ fetchRepos ~ error:", error);
    }
  }

  async function handleFetch(name: string) {
    setLoading(true);
    await Promise.all([fetchProfile(name), fetchRepos(name)]);
    setLoading(false);
  }

  function handleSeeAll() {
    if (!showAll) {
      setSelectedRepos([...repos]);
    } else {
      setSelectedRepos([...repos.slice(0, 4)]);
    }
    setShowAll(!showAll);
  }

  function handleOpenNav(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    handleFetch("github");
  }, []);

  useEffect(() => {
    fetchRepos(`${user?.login}`);
  }, [user])

  if (loading) {
    return <HomeSkeleton />;
  }

  const { avatar_url, followers, following, location, name, bio } =
    user as UserI;
    
  return (
    <div className={styles.container}>
      <div className={styles["body"]}>
        <section className={styles["profile-container"]}>
          <div className={styles["image-header"]}>
            <Image
              className={styles["profile-img"]}
              alt="Image logo"
              src={avatar_url}
              width={150}
              height={150}
            />
          </div>
          <div className={styles["tags-container"]}>
            <InformationTag label="Followers" value={followers} />
            <InformationTag label="Following" value={following} />
            <InformationTag label="Location" value={location} />
          </div>
        </section>
        <section className={styles["bio-container"]}>
          <h1>{name}</h1>
          <p>{bio}</p>
        </section>

        <section className={styles["repo-container"]}>
          {selectedRepos.map((elto, index) => (
            <RepoCard
              repo={elto}
              key={index}
              onClick={() => handleOpenNav(elto.html_url)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomeLayout;
