"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";
import InformationTag from "@/components/elements/tags/InformationTag/InformationTag";
import { getProfile, getRepos } from "@/api/profile";
import RepoCard from "@/components/elements/cards/RepoCard/RepoCard";

const HomeLayout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState({});
  const [repos, setRepos] = useState([]);
  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const [loading, setLoading] = useState(false);

  async function fetchProfile(name: string) {
    try {
      const data = await getProfile(name);
      setProfile(data);
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
    } catch (error) {
      console.log("🚀 ~ file: HomeLayout.tsx:30 ~ fetchRepos ~ error:", error);
    }
  }

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      await Promise.all([fetchProfile("github"), fetchRepos("github")]);
      setLoading(false);
    };
    handleFetch();
  }, []);

  if (loading) {
    return (
      <div className={styles.contianer}>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CustomInput value={searchValue} onChange={onChangeSearchValue} />
      </div>
      <div className={styles["profile-header"]}>
        <div className={styles["image-container"]}>
          <img
            src={profile.avatar_url}
            className={styles["profile-img"]}
            alt="Profile Image"
          />
        </div>
        <div className={styles["tags-container"]}>
          <div className={styles.tags}>
            <InformationTag label="Followers" value={profile.followers} />
            <InformationTag label="Following" value={profile.following} />
            <InformationTag label="Location" value={profile.location} />
          </div>
        </div>
      </div>
      <div className={styles["bio-container"]}>
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
      </div>
      <div className={styles["repo-container"]}>
        {repos.slice(0,3).map((elto, index) => (
          <RepoCard repo={elto} key={index} />
        ))}
      </div>
      <section>
        <p>View all repositories</p>
      </section>
    </div>
  );
};

export default HomeLayout;
